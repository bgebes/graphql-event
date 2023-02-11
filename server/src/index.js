import { createServer } from 'node:http';
import { createPubSub, createYoga } from 'graphql-yoga';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './graphQL/index.js';
import db from './assets/json/data.js';

const pubsub = createPubSub();
const yoga = createYoga({
  schema,
  context: { pubsub, db },
  plugins: [],
  graphiql: {
    subscriptionsProtocol: 'WS',
  },
});

const httpServer = createServer(yoga);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: yoga.graphqlEndpoint,
});

useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload,
        });

      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe,
        },
      };

      const errors = validate(args.schema, args.document);
      if (errors.length) return errors;
      return args;
    },
  },
  wsServer
);

httpServer.listen(4000, () => {
  console.info('HTTP Server is running on http://localhost:4000/graphql');
});
