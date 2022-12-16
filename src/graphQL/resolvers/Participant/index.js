import MockData from '../../../assets/json/data.json' assert { type: 'json' };
const { events, users, participants } = MockData;

export const Participant = {
  user: (parent) => users.find((u) => u.id == parent.user_id),
  event: (parent) => events.find((e) => e.id == parent.event_id),
};

export const participantQueries = {
  participants: () => participants,
  participant: (_, args) => participants.find((p) => p.id == args.id),
};

export const participantMutations = {
  addParticipant: (_, { data }, { pubsub }) => {
    let lastID = participants.at(-1).id ?? -1;

    const newParticipant = { id: lastID + 1, ...data };

    participants.push(newParticipant);
    pubsub.publish('participantAdded', newParticipant);

    return newParticipant;
  },
  updateParticipant: (_, { id, data }) => {
    const selected_index = participants.findIndex(
      (participant) => participant.id == id
    );

    if (selected_index == -1) {
      throw new Error('Participant not found!');
    }

    const participant = participants[selected_index];
    const updatedState = { ...participant, ...data };

    location[selected_index] = updatedState;
    return updatedState;
  },
  deleteParticipant: (_, { id }) => {
    const participant_index = participants.findIndex(
      (participant) => participant.id == id
    );

    if (participant_index == -1) {
      throw new Error('Participant not found!');
    }

    const participant = participants[participant_index];

    participants.splice(participant_index, 1);
    return participant;
  },
  deleteAllParticipants: () => {
    const count = participants.length;
    participants.splice(0, count);

    return { count };
  },
};

export const participantSubscriptions = {
  participantAdded: {
    subscribe: (_, __, { pubsub }) => pubsub.subscribe('participantAdded'),
    resolve: (payload) => payload,
  },
};
