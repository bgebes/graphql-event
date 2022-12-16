import { createServer } from 'node:http';
import { createPubSub, createYoga } from 'graphql-yoga';
import { schema } from './src/graphQL/index.js';
import db from './src/assets/json/data.json' assert { type: 'json' };

const pubsub = createPubSub();
const yoga = createYoga({
  schema,
  context: { pubsub, db },
  plugins: [],
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
});
