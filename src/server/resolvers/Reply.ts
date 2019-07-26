import { Res } from 'types';

export const Reply: Res['Reply'] = {
  message: (parent, args, ctx) => {
    return ctx.prisma.reply({ id: parent.id }).message();
  },
};
