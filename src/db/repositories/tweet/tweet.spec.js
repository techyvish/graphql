import {
  expect,
} from 'chai';
// import sinon from 'sinon';
// import {
//   TweetRepository,
// } from '../../repositories';
// import {
//   TweetModel,
// } from '..';
// import {
//   Tweet,
// } from '../../schema';

// const should = chai.should();

describe('Tweet', () => {
  // TODO: change to tweet data
  // const userData = {
  //   _id: '000000-000000-00000',
  //   name: 'vishal',
  // };
  beforeEach(() => {});

  afterEach(() => {});

  describe('Create()', () => {
    it('should run chai', () => {
      expect(1).equals(1);
    });
  });
  // describe('Create()', () => {
  //   it('Should create a new Tweet', async () => {
  //     const tweetRepository = new TweetRepository(Tweet);
  //     const stub = sinon.stub(tweetRepository, 'create').returns(
  //       new Promise(resolve => resolve(userData)),
  //     );
  //     try {
  //       const tweet = await TweetModel.createTweet(userData, tweetRepository);
  //       expect(tweet).to.be.a('object');
  //       expect(tweet.name).equals('vishal');
  //       should.not.equal(tweet, null);
  //       // eslint-disable-next-line no-underscore-dangle
  //       should.not.equal(tweet._id, null);
  //     } catch (error) {
  //       should.equal(error, null);
  //     }
  //     stub.restore();
  //   });

  //   it('Should failed to create new User', async () => {
  //     const tweetRepository = new TweetRepository(Tweet);
  //     const stub = sinon.stub(tweetRepository, 'create').returns(
  //       new Promise((resolve, reject) => {
  //         reject(Error('unable to create new user'));
  //       }),
  //     );

  //     // try {
  //     //   await UserModel.createUser(userData, tweetRepository);
  //     // } catch (error) {
  //     //   expect(error.message).equals('unable to create new user');
  //     // }
  //     stub.reset();
  //   });
  // });
});
