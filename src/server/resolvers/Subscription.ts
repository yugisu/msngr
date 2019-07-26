import { Res } from 'types';

export const Subscription: Res['Subscription'] = {
  message: {
    subscribe: async (parent, args, ctx) => {
      const sub = await ctx.prisma.$subscribe
        .message({
          mutation_in: ['CREATED', 'DELETED', 'UPDATED'],
        })
        .node();

      return sub;
    },
    resolve: (value) => value,
  },
};
