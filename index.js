import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import MockData from './assets/json/data.json' assert { type: 'json' };

const { events, locations, users, participants } = MockData;

const typeDefs = gql`
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

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Participant {
    id: ID!
    user_id: ID!
    user: User!
    event_id: ID!
    event: Event!
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
