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
    user_id: ID!
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
    event_id: ID!
  }

  type Query {
    events: [Event!]!
    locations: [Location!]!
    users: [User!]!
    participants: [Participant!]!
  }
`;

const resolvers = {
  Query: {
    events: () => events,
    locations: () => locations,
    users: () => users,
    participants: () => participants,
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
