import chai, {
  expect,
} from 'chai';
import sinon from 'sinon';
import {
  UserRepository,
} from '..';
import {
  ObjectID,
} from 'mongodb';
import chalk from 'chalk';
import {
  User,
} from '../../schema';
import connectToTestDB from '../../../tests/utils';

const should = chai.should();

describe('User', () => {
  const userData = {
    _id: '000000-000000-00000',
    name: 'vishal',
  };

  beforeEach(() => {});

  afterEach(() => {});

  describe('Create()', () => {
    it('Should create a new User', async () => {
      const userRepository = new UserRepository(User);
      const stub = sinon.stub(userRepository, 'create').returns(
        new Promise(resolve => resolve(userData)),
      );
      try {
        const user = await userRepository.create(userData);
        expect(user).to.be.a('object');
        expect(user.name).equals('vishal');
        should.not.equal(user, null);
        // eslint-disable-next-line no-underscore-dangle
        should.not.equal(user._id, null);
      } catch (error) {
        should.equal(error, null);
      }
      stub.restore();
    });

    it('Should failed to create new User', async () => {
      const userRepository = new UserRepository(User);
      const stub = sinon.stub(userRepository, 'create').returns(
        new Promise((resolve, reject) => {
          reject(Error('unable to create new user'));
        }),
      );

      try {
        await userRepository.create(userData);
      } catch (error) {
        expect(error.message).equals('unable to create new user');
      }
      stub.reset();
    });
  });

  describe('It should store new user in test mongo', async () => {
    it('Should save a new User in db', async () => {
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

      try {
        await connectToTestDB();
        const userRepository = new UserRepository();
        const user = await userRepository.create(obj);
        // eslint-disable-next-line
        expect(user._id).not.equals(null);
        expect(user.firstName).equals('vishal');
        expect(user.lastName).equals('patel');
      } catch (err) {
        expect(err).equals(null);
      }
    });
  });

});
