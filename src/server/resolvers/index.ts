import { Query } from './Query';
import { Mutation } from './Mutation';
import { Message } from './Message';
import { Reply } from './Reply';

import { Res } from 'types';
import { DateTime } from 'scalars/datetime.scalar';

export const resolvers: Res = {
  Query,
  Mutation,
  Message,
  Reply,
  // Scalars
  DateTime,
};
