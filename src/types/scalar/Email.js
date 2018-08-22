import {
  GraphQLScalarType,
} from 'graphql';
import {
  GraphQLError,
} from 'graphql/error';
import {
  Kind,
} from 'graphql/language';

const validate = (emailString) => {
  // Regex taken from: http://stackoverflow.com/a/46181/761555
  const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  // eslint-disable-next-line
  return (re.test(emailString)) ? true : false;
};

export default new GraphQLScalarType({
  name: 'Email',
  description: 'This is email scalar type describes email',
  serialize: value => value,
  parseValue: (value) => {
    // called from $input query
    if (!validate(value)) {
      throw new GraphQLError('Query error: Not a valid Email', value);
    }
    return value;
  },
  parseLiteral: (ast) => {
    // called when direct input
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Query error: Can only parse strings got a: ${ast.kind}`, [ast]);
    }
    if (!validate(ast.value)) {
      throw new GraphQLError('Query error: Not a valid Email', [ast]);
    }
    return ast.value;
  },
});
