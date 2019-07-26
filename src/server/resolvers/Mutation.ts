import { Res } from 'types';

export const Mutation: Res['Mutation'] = {
  postMessage: async (parent, args, { prisma }) => {
    const newMessage = await prisma.createMessage({ body: args.body });

    return newMessage;
  },

  postReply: async (parent, args, { prisma }) => {
    const messageExists = await prisma.$exists.message({ id: args.messageId });

    if (!messageExists) {
      throw new Error(`Message with ID ${args.messageId} does not exist`);
    }

    return await prisma.createReply({
      body: args.body,
      message: { connect: { id: args.messageId } },
    });
  },

  updateMessage: async (_, args, { prisma }) => {
    const mes = await prisma.updateMessage({
      where: { id: args.messageId },
      data: {},
    });

    return mes;
  },
};
