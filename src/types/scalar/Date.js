import { GraphQLScalarType, GraphQLError } from 'graphql';
import { Kind } from 'graphql/language';

const validate = (value) => isNaN(Date.parse(value)) ? true : false;

export default new GraphQLScalarType({
    name: 'Date',
    description: 'Date type',
    serialize(value) {
        // value comes from resolvers
        return value.toISOString(); // sent to the client
    },
    parseValue(value) {
        // value comes from the client
        if (!validate(value)) {
            throw new GraphQLError(`Query error: not a valid date`, value);
        }
        return new Date(value); // sent to resolvers
    },
    parseLiteral(ast) {
        // ast comes from parsing the query
        // this is where you can validate and transform
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(
                `Query error: Can only parse dates strings, got a: ${ast.kind}`,
                [ast],
            );
        }
        if (!validate(ast.value)) {
            throw new GraphQLError(`Query error: not a valid date`, [ast]);
        }
        return new Date(ast.value);
    },
});
