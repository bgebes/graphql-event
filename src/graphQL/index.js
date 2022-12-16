import path from 'path';
import { createSchema } from 'graphql-yoga';
import { resolvers } from './resolvers/index.js';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typeSource = loadFilesSync(path.dirname('./schemas'), {
  extensions: ['graphql'],
});
const typeDefs = mergeTypeDefs(typeSource);

export const schema = createSchema({
  typeDefs,
  resolvers,
});
