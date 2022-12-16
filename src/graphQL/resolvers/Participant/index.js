export const Participant = {
  user: (parent, _, { db }) => db.users.find((u) => u.id == parent.user_id),
  event: (parent, _, { db }) => db.events.find((e) => e.id == parent.event_id),
};

export const participantQueries = {
  participants: (_, __, { db }) => db.participants,
  participant: (_, args, { db }) =>
    db.participants.find((p) => p.id == args.id),
};

export const participantMutations = {
  addParticipant: (_, { data }, { pubsub, db }) => {
    let lastID = db.participants.at(-1).id ?? -1;

    const newParticipant = { id: lastID + 1, ...data };

    db.participants.push(newParticipant);
    pubsub.publish('participantAdded', newParticipant);

    return newParticipant;
  },
  updateParticipant: (_, { id, data }, { db }) => {
    const selected_index = db.participants.findIndex(
      (participant) => participant.id == id
    );

    if (selected_index == -1) {
      throw new Error('Participant not found!');
    }

    const participant = db.participants[selected_index];
    const updatedState = { ...participant, ...data };

    db.participants[selected_index] = updatedState;
    return updatedState;
  },
  deleteParticipant: (_, { id }, { db }) => {
    const participant_index = db.participants.findIndex(
      (participant) => participant.id == id
    );

    if (participant_index == -1) {
      throw new Error('Participant not found!');
    }

    const participant = db.participants[participant_index];

    db.participants.splice(participant_index, 1);
    return participant;
  },
  deleteAllParticipants: (_, __, { db }) => {
    const count = db.participants.length;
    db.participants.splice(0, count);

    return { count };
  },
};

export const participantSubscriptions = {
  participantAdded: {
    subscribe: (_, __, { pubsub }) => pubsub.subscribe('participantAdded'),
    resolve: (payload) => payload,
  },
};
