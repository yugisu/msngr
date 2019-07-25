import { prisma } from 'generated/prisma-client';
import { Resolvers } from 'generated/ql-types';

export type ServerContext = {
  prisma: typeof prisma;
};

export type Res = Omit<Resolvers<ServerContext>, 'Subscription'> & {
  Subscription: {
    message: {
      subscribe: (p: any, args: any, ctx: ServerContext) => any | Promise<any>;
      resolve: (value: any) => typeof value;
    };
  };
};
