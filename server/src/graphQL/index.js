import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { createSchema } from 'graphql-yoga';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

const __dirname = dirname(fileURLToPath(import.meta.url));

const paths = {
  types: join(__dirname, './schemas'),
  resolvers: join(__dirname, './resolvers'),
};

const sources = {
  types: loadFilesSync(paths.types, {
    requireMethod: (path) => {
      return import(pathToFileURL(path));
    },
  }),
  resolvers: loadFilesSync(paths.resolvers, {
    extractExports(fileExport) {
      if (typeof fileExport === 'function') {
        return fileExport('query_root');
      }
      return fileExport;
    },
  }),
};

const typeDefs = mergeTypeDefs(sources.types);
const resolvers = mergeResolvers(sources.resolvers);

export const schema = createSchema({
  typeDefs,
  resolvers,
});
