import { Query } from 'resolvers/Query';
import { Mutation } from 'resolvers/Mutation';

import { Res } from 'types';
import { DateTime } from 'scalars/datetime.scalar';

export const resolvers: Res = {
  Query,
  Mutation,
  DateTime,
};
