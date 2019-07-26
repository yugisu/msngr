import { Query } from './Query';
import { Mutation } from './Mutation';
import { Subscription } from './Subscription';
import { Message } from './Message';
import { Reply } from './Reply';
import { DateTime } from 'scalars/datetime.scalar';

import { Res } from 'types';

export const resolvers: Res = {
  Query,
  Mutation,
  Subscription,
  Message,
  Reply,
  // Scalars
  DateTime,
};
