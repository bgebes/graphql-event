export const Event = {
  user: (parent, _, { db }) => db.users.find((u) => u.id == parent.user_id),
  location: (parent, _, { db }) =>
    db.locations.find((l) => l.id == parent.location_id),
  participants: (parent, _, { db }) =>
    db.participants.filter((p) => p.event_id == parent.id),
};

export const eventQueries = {
  events: (_, __, { db }) => db.events,
  event: (_, args, { db }) => db.events.find((e) => e.id == args.id),
};

export const eventMutations = {
  addEvent: (_, { data }, { pubsub, db }) => {
    let lastID = db.events.at(-1).id ?? -1;

    const newEvent = { id: lastID + 1, ...data, participants: [] };

    db.events.push(newEvent);
    pubsub.publish('eventCreated', newEvent);

    return newEvent;
  },
  updateEvent: (_, { id, data }, { db }) => {
    const selected_index = db.events.findIndex((event) => event.id == id);

    if (selected_index == -1) {
      throw new Error('Event not found!');
    }

    const event = db.events[selected_index];
    const updatedState = { ...event, ...data };

    db.events[selected_index] = updatedState;
    return updatedState;
  },
  deleteEvent: (_, { id }, { db }) => {
    const event_index = db.events.findIndex((event) => event.id == id);

    if (event_index == -1) {
      throw new Error('Event not found!');
    }

    const event = db.events[event_index];

    db.events.splice(event_index, 1);
    return event;
  },
  deleteAllEvents: (_, __, { db }) => {
    const count = db.events.length;
    db.events.splice(0, count);

    return { count };
  },
};

export const eventSubscriptions = {
  eventCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.subscribe('eventCreated'),
    resolve: (payload) => payload,
  },
};
