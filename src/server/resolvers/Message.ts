import { Res } from 'types';

export const Message: Res['Message'] = {
  replies: (parent, args, ctx) => {
    return ctx.prisma.message({ id: parent.id }).replies({ orderBy: 'createdAt_DESC' });
  },
};
