import Base from '../base';

const User = `
extend type Query {
    User(id: ID!): User
}

type User {
    _id: ID!
    firstName: String
    lastName: String
    fullName: String
    email: Email!
    name: String @deprecated
    avatarUrl: String
    registrationStatus: String
    mobile: String
    tweets: [Tweet]!
}

extend type Mutation {
  createUser(authProvider: AuthProviderSignupData!): User
  registerMobile(mobileProvider: MobileNumberRegistrationData!): User
  verifyOtp(otpProvider: OtpRegistrationData!): User
  # uploadPhoto(photoProvider: PhotoProvider!): User
}

input AuthProviderSignupData {
  detail: AUTH_PROVIDER_DETAIL
}

input AUTH_PROVIDER_DETAIL {
  firstName: String!
  lastName: String!
  gender: String!
  email: Email!
  dateOfBirth: Date!
}

input MobileNumberRegistrationData {
  detail: MOBILE_REGISTRATION_DETAIL
}

input MOBILE_REGISTRATION_DETAIL {
  mobile: String!
  id: String!
}

input OtpRegistrationData {
  detail: OTP_REGISTRATION_DETAIL
}

input OTP_REGISTRATION_DETAIL {
  mobile: String!
  otp: String!
  id: String!
}

`;

/*

      const obj = {
        firstName: 'vishal',
        lastName: 'patel',
        gender: 'male',
        email: 'v@d.com',
        dateOfBirth: new Date('05-15-1983'),
        dateAdded: new Date('05-15-2018'),
        title: 'test tile',
        description: 'test description',
        imageUrls: ['http://test.com/1.png', 'http://test.com/2.png'],
        subscription: new ObjectID('5b64efe797ff07ad03d71f8b'),
        address: {
          street1: 'test',
          street2: 'test2',
          city: 'test3',
          country: 'US',
          state: 'CA',
          pin: '94041',
          isHidden: false,
        },
        mobile: '444-444-4444',
        mobileVerified: true,
        otp: 99999,
        height: '5-6',
        community: 'hindu',
        language: 'gujarati',
        registrationStatus: 'unknown',
      };

*/
export default () => [User, Base];
