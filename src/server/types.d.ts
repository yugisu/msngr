import { prisma } from 'generated/prisma-client';
import { Resolvers } from 'generated/ql-types';

export type ServerContext = {
  prisma: typeof prisma;
};

export type Res = Resolvers<ServerContext>;
