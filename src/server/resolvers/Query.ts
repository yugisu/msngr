import { Res } from 'types';

export const Query: Res['Query'] = {
  messages: async (_, args, ctx) => {
    const result = await ctx.prisma.messages();

    console.log('MESSAGES:', result);

    return result;
  },

  replies: async (_, args, ctx) => {
    const result = await ctx.prisma.replies();

    console.log('REPLIES:', result);

    return result;
  },
};
