import {
  ObjectId,
} from 'mongodb';
import {
  GraphQLError,
} from 'graphql/error';

export const Query = {
  User: async (root, arg, {
    userRepository,
  }) => {
    const user = await userRepository.findOne(arg.id);
    return user;
  },
};

export const User = {
  fullName: author => `${author.firstName} ${author.lastName}`,
  tweets: async (author, _, {
    tweetRepository,
  }) => {
    const tweetsByUser = await tweetRepository.findQuery({
      // eslint-disable-next-line
      $where: () => (this.author_id === new ObjectId(author._id)),
    });
    return tweetsByUser;
  }
};

export const Mutation = {
  createUser: async (root, arg, {
    userRepository,
  }) => {
    const newUser = {
      firstName: arg.authProvider.detail.firstName,
      lastName: arg.authProvider.detail.lastName,
      email: arg.authProvider.detail.email,
      gender: arg.authProvider.detail.gender,
      dateOfBirth: arg.authProvider.detail.dateOfBirth,
      registrationStatus: 'registered'
    };

    const response = await userRepository.create(newUser);
    return response;
  },

  registerMobile: async (root, arg, {
    userRepository,
  }) => {
    const userId = arg.mobileProvider.detail.id
    const detailToUpdate = {
      mobile: arg.mobileProvider.detail.mobile,
      // generate OTP and add here
      otp: 999999
    };

    const response = await userRepository.update(userId, detailToUpdate);
    return response;
  },

  verifyOtp: async (root, arg, {
    userRepository,
  }) => {
    const {
      id,
      mobile,
      otp
    } = arg.otpProvider.detail;

    const user = await userRepository.findOne(id);
    if (user.mobile !== mobile || user.otp !== parseInt(otp, 0)) {
      throw new GraphQLError('OTP could not be verified.');
    }

    const response = await userRepository.update(id, {
      registrationStatus: 'verified',
    });

    return response;

  },
};
