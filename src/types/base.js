const Base = `
type Query {
    dummy: Boolean
}

type Mutation {
    dummy: Boolean
}

type Subscription {
    dummy: Boolean
}

type Meta {
    count: Int
}

scalar Url
scalar Date
scalar Email
`;

export default () => [Base];
