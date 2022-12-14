import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import MockData from './assets/json/data.json' assert { type: 'json' };

const { events, locations, users, participants } = MockData;

const typeDefs = gql`
  # Event

  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    location: Location!
    user_id: ID!
    user: User!
    participants: [Participant!]!
  }

  input addEventInput {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
  }

  input updateEventInput {
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: ID
    user_id: ID
  }

  # Location

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input addLocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input updateLocationInput {
    name: String
    desc: String
    lat: Float
    lng: Float
  }

  # User

  type User {
    id: ID!
    username: String!
    email: String!
  }

  input addUserInput {
    username: String!
    email: String!
  }

  input updateUserInput {
    username: String
    email: String
  }

  # Participant

  type Participant {
    id: ID!
    user_id: ID!
    user: User!
    event_id: ID!
    event: Event!
  }

  input addParticipantInput {
    user_id: ID!
    event_id: ID!
  }

  input updateParticipantInput {
    user_id: ID
    event_id: ID
  }

  type deleteAllOfListOutput {
    count: Int!
  }

  type Query {
    events: [Event!]!
    event(id: ID!): Event!

    locations: [Location!]!
    location(id: ID!): Location!

    users: [User!]!
    user(id: ID!): User!

    participants: [Participant!]!
    participant(id: ID!): Participant!
  }

  type Mutation {
    addUser(data: addUserInput!): User!
    updateUser(id: ID!, data: updateUserInput!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers: deleteAllOfListOutput!

    addEvent(data: addEventInput!): Event!
    updateEvent(id: ID!, data: updateEventInput!): Event!
    deleteEvent(id: ID!): Event!
    deleteAllEvents: deleteAllOfListOutput!

    addLocation(data: addLocationInput!): Location!
    updateLocation(id: ID!, data: updateLocationInput!): Location!
    deleteLocation(id: ID!): Location!
    deleteAllLocations: deleteAllOfListOutput!

    addParticipant(data: addParticipantInput!): Participant!
    updateParticipant(id: ID!, data: updateParticipantInput!): Participant!
    deleteParticipant(id: ID!): Participant!
    deleteAllParticipants: deleteAllOfListOutput!
  }
`;

const resolvers = {
  Query: {
    events: () => events,
    event: (_, args) => events.find((e) => e.id == args.id),

    locations: () => locations,
    location: (_, args) => locations.find((l) => l.id == args.id),

    users: () => users,
    user: (_, args) => users.find((u) => u.id == args.id),

    participants: () => participants,
    participant: (_, args) => participants.find((p) => p.id == args.id),
  },
  Mutation: {
    addUser: (_, { data }) => {
      let lastID = users.at(-1).id ?? -1;

      const newUser = { id: lastID + 1, ...data };

      users.push(newUser);
      return newUser;
    },
    updateUser: (_, { id, data }) => {
      const selected_index = users.findIndex((user) => user.id == id);

      if (selected_index == -1) {
        throw new Error('User not found!');
      }

      const user = users[selected_index];
      const updatedState = { ...user, ...data };

      users[selected_index] = updatedState;
      return updatedState;
    },
    deleteUser: (_, { id }) => {
      const user_index = users.findIndex((user) => user.id == id);

      if (user_index == -1) {
        throw new Error('User not found!');
      }

      const user = users[user_index];

      users.splice(user_index, 1);
      return user;
    },
    deleteAllUsers: () => {
      const count = users.length;
      users.splice(0, count);

      return { count };
    },
    addEvent: (_, { data }) => {
      let lastID = events.at(-1).id ?? -1;

      const newEvent = { id: lastID + 1, ...data, participants: [] };

      events.push(newEvent);
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
    addLocation: (_, { data }) => {
      let lastID = locations.at(-1).id ?? -1;

      const newLocation = { id: lastID + 1, ...data };

      locations.push(newLocation);
      return newLocation;
    },
    updateLocation: (_, { id, data }) => {
      const selected_index = locations.findIndex(
        (location) => location.id == id
      );

      if (selected_index == -1) {
        throw new Error('Location not found!');
      }

      const location = locations[selected_index];
      const updatedState = { ...location, ...data };

      location[selected_index] = updatedState;
      return updatedState;
    },
    deleteLocation: (_, { id }) => {
      const location_index = locations.findIndex(
        (location) => location.id == id
      );

      if (location_index == -1) {
        throw new Error('Location not found!');
      }

      const location = locations[location_index];

      locations.splice(location_index, 1);
      return location;
    },
    deleteAllLocations: () => {
      const count = locations.length;
      locations.splice(0, count);

      return { count };
    },
    addParticipant: (_, { data }) => {
      let lastID = participants.at(-1).id ?? -1;

      const newParticipant = { id: lastID + 1, ...data };

      participants.push(newParticipant);
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
  },
  Event: {
    user: (parent) => users.find((u) => u.id == parent.user_id),
    location: (parent) => locations.find((l) => l.id == parent.location_id),
    participants: (parent) =>
      participants.filter((p) => p.event_id == parent.id),
  },
  Participant: {
    user: (parent) => users.find((u) => u.id == parent.user_id),
    event: (parent) => events.find((e) => e.id == parent.event_id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // Options
    }),
  ],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
