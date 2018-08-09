import { ObjectId } from 'mongodb';
import { prepare } from '../../utils';
import Email from '../scalar/Email';

export const Query = {
  User: async (root, arg, { userRepository }) => {
    const user = prepare(await userRepository.findOne(arg.id));
    return user;
  },
};

export const User = {
  fullname: async (author, _, { tweetRepository }) => {
    return await (`${author.firstname} ${author.lastname}`);
  },
  tweets: async (author, _, { tweetRepository }) => {
    let tweetsByUser = await tweetRepository.findQuery({ $where: () => { this.author_id == new ObjectId(author._id) }});
    let data = await tweetsByUser.toArray();
    return data.map(prepare);
  }
};

export const Mutation = {
  createUser: async (root, arg, { userRepository }) => {
    const newUser = {
      username: arg.authProvider.detail.username,
      firstname: arg.authProvider.detail.firstname,
      lastname: arg.authProvider.detail.lastname,
      email: arg.authProvider.detail.email,
    };
    const response = await userRepository.create(newUser);
    return prepare(Object.assign({ _id: response.insertedIds[0] }, newUser));
  },
};