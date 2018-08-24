import {
  ObjectId,
} from 'mongodb';

export const Query = {
  User: async (root, arg, {
    userRepository,
  }) => {
    const user = await userRepository.findOne(arg.id);
    return user;
  },
};

export const User = {
  fullname: author => `${author.firstname} ${author.lastname}`,
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
      username: arg.authProvider.detail.username,
      firstname: arg.authProvider.detail.firstname,
      lastname: arg.authProvider.detail.lastname,
      email: arg.authProvider.detail.email,
    };
    const response = await userRepository.create(newUser);
    return response;
  },
};
