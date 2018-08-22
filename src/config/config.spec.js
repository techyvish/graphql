import chai, {
  expect,
} from 'chai';
import {
  describe,
} from 'mocha';
import {
  config,
} from './index';

require('babel-core/register');
require('babel-polyfill');

const should = chai.should();

describe('Configuration', () => {
  describe('Create Configuration', () => {
    afterEach(() => {
      delete process.env.NODE_ENV;
    });

    it('Should read all development configuration ', async () => {
      process.env.NODE_ENV = 'development';
      expect(config.app_port).equal(4000);
      expect(config.db_url).equal('localhost');
      should.not.equal(config.db_name, null || undefined);
    });

    it('Should read all production configuration ', async () => {
      process.env.NODE_ENV = 'production';
      expect(config.app_port).equal(4000);
      expect(config.db_url).equal('localhost');
      should.not.equal(config.db_name, null || undefined);
    });
  });
});
