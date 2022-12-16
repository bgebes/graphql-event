import MockData from '../../../assets/json/data.json' assert { type: 'json' };
const { events, locations, users, participants } = MockData;

export const Event = {
  user: (parent) => users.find((u) => u.id == parent.user_id),
  location: (parent) => locations.find((l) => l.id == parent.location_id),
  participants: (parent) => participants.filter((p) => p.event_id == parent.id),
};

export const eventQueries = {
  events: () => events,
  event: (_, args) => events.find((e) => e.id == args.id),
};

export const eventMutations = {
  addEvent: (_, { data }, { pubsub }) => {
    let lastID = events.at(-1).id ?? -1;

    const newEvent = { id: lastID + 1, ...data, participants: [] };

    events.push(newEvent);
    pubsub.publish('eventCreated', newEvent);

    return newEvent;
  },
  updateEvent: (_, { id, data }) => {
    const selected_index = events.findIndex((event) => event.id == id);

    if (selected_index == -1) {
      throw new Error('Event not found!');
    }

    const event = events[selected_index];
    const updatedState = { ...event, ...data };

    events[selected_index] = updatedState;
    return updatedState;
  },
  deleteEvent: (_, { id }) => {
    const event_index = events.findIndex((event) => event.id == id);

    if (event_index == -1) {
      throw new Error('Event not found!');
    }

    const event = events[event_index];

    events.splice(event_index, 1);
    return event;
  },
  deleteAllEvents: () => {
    const count = events.length;
    events.splice(0, count);

    return { count };
  },
};

export const eventSubscriptions = {
  eventCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.subscribe('eventCreated'),
    resolve: (payload) => payload,
  },
};
