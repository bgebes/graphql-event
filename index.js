import { createServer } from 'node:http';
import { createPubSub, createYoga } from 'graphql-yoga';
import { schema } from './src/graphQL/index.js';

const pubsub = createPubSub();
const yoga = createYoga({ schema, context: { pubsub }, plugins: [] });
const server = createServer(yoga);

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
});
