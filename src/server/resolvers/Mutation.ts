import { Res } from 'types';

export const Mutation: Res['Mutation'] = {
  postMessage: async (_, args, { prisma }) => {
    const newMessage = await prisma.createMessage({ body: args.body });

    return newMessage;
  },

  postReply: async (_, args, { prisma }) => {
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

  likeMessage: async (_, args, { prisma }) => {
    const message = await prisma.message({ id: args.messageId });

    if (!message) throw new Error(`Message with id ${args.messageId} does not exist`);

    const result = await prisma.updateMessage({
      where: { id: args.messageId },
      data: { likes: message.likes + args.amount },
    });
    return result;
  },

  dislikeMessage: async (_, args, { prisma }) => {
    const message = await prisma.message({ id: args.messageId });

    if (!message) throw new Error(`Message with id ${args.messageId} does not exist`);

    const result = await prisma.updateMessage({
      where: { id: args.messageId },
      data: { dislikes: message.dislikes + args.amount },
    });
    return result;
  },
};
