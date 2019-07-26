import { Res } from 'types';

export const Query: Res['Query'] = {
  messages: async (_, args, ctx) => {
    const { filter, first, after } = args;

    const where = filter ? { body_contains: filter } : undefined;

    const items = await ctx.prisma.messages({
      where,
      orderBy: 'createdAt_DESC',
      first: first || undefined,
      after: after || undefined,
    });

    const count = await ctx.prisma
      .messagesConnection()
      .aggregate()
      .count();

    return { items, count };
  },

  replies: async (_, args, ctx) => {
    const result = await ctx.prisma.replies();

    return result;
  },
};
