import Base from '../base';

const User = `
extend type Query {
    User(id: ID!): User
}

type User {
    _id: ID!
    username: String
    firstname: String
    lastname: String
    fullname: String
    email: Email!
    name: String @deprecated
    avatarurl: String
    tweets: [Tweet]!
}

extend type Mutation {
  createUser(authProvider: AuthProviderSignupData!): User
}

input AuthProviderSignupData {
  detail: AUTH_PROVIDER_DETAIL
}

input AUTH_PROVIDER_DETAIL {
  username: String!
  firstname: String!
  lastname: String!
  email: Email!
}
`;

export default () => [User, Base];
