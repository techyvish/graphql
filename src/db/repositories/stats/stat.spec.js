import {
  expect,
} from 'chai';
// import sinon from 'sinon';
// import {
//   StatsRepository,
// } from '../../repositories';
// import {
//   StatModel,
// } from '..';
// import {
//   Stat,
// } from '../../schema';

// const should = chai.should();

describe('Stat', () => {
  // TODO: change to stat data
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
  //   it('Should create a new User', async () => {
  //     const statRepository = new StatsRepository(Stat);
  //     const stub = sinon.stub(statRepository, 'create').returns(
  //       new Promise(resolve => resolve(userData)),
  //     );
  //     try {
  //       const stat = await UserModel.createUser(userData, userRepository);
  //       expect(stat).to.be.a('object');
  //       expect(user.name).equals('vishal');
  //       should.not.equal(stat, null);
  //       // eslint-disable-next-line no-underscore-dangle
  //       should.not.equal(stat._id, null);
  //     } catch (error) {
  //       should.equal(error, null);
  //     }
  //     stub.restore();
  //   });

  //   it('Should failed to create new User', async () => {
  //     // const statRepository = new StatRepository(Stat);
  //     const stub = sinon.stub(statRepository, 'create').returns(
  //       new Promise((resolve, reject) => {
  //         reject(Error('unable to create new user'));
  //       }),
  //     );

  //     // try {
  //     //   await UserModel.createUser(userData, userRepository);
  //     // } catch (error) {
  //     //   expect(error.message).equals('unable to create new user');
  //     // }
  //     stub.reset();
  //   });
  // });
});
