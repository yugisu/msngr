import { GraphQLServer } from 'graphql-yoga';
import { IResolvers } from 'graphql-tools';

import { prisma } from './generated/prisma-client';
import { resolvers } from 'resolvers';

const server = new GraphQLServer({
  typeDefs: './src/server/schema.graphql',
  resolvers: resolvers as IResolvers,
  context: { prisma },
});

server.start(() => console.log('Serving playground at http://localhost:4000'));
