import { Res } from 'types';

export const Query: Res['Query'] = {
  messages: async (_, args, ctx) => {
    const result = await ctx.prisma.messages();

    return result;
  },

  replies: async (_, args, ctx) => {
    const result = await ctx.prisma.replies();

    return result;
  },
};
