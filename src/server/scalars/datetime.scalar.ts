import moment from 'moment';

import { GraphQLScalarType, Kind } from 'graphql';

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime implementation based on moment.js',
  parseValue: (value) => {
    return moment(value);
  },
  serialize: (value) => {
    return moment(value).toISOString();
  },
  parseLiteral: (ast) => {
    switch (ast.kind) {
      case Kind.INT:
      case Kind.STRING:
        return moment(ast.value);
      default:
        return null;
    }
  },
});
