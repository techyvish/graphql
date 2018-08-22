import {
  ObjectId,
} from 'mongodb';
import {
  prepare,
} from '../../utils';

export const Query = {
  User: async (root, arg, {
    userRepository,
  }) => {
    const user = prepare(await userRepository.findOne(arg.id));
    return user;
  },
};

export const User = {
  fullname: author => `${author.firstname} ${author.lastname}`,
  tweets: async (author, _, {
    tweetRepository,
  }) => {
    const tweetsByUser = await tweetRepository.findQuery({
      $where: () => {
        // eslint-disable-next-line no-underscore-dangle
        const isEqual = this.author_id === new ObjectId(author._id);
        return isEqual;
      },
    });
    const data = await tweetsByUser.toArray();
    return data.map(prepare);
  },
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
    return prepare(Object.assign({
      _id: response.insertedIds[0],
    }, newUser));
  },
};
