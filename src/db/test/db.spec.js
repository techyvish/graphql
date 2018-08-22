import {
    expect,
} from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import connectMongo from '..';
import _ from 'lodash';
import {
    configEnum,
} from '../../config';

describe('connectMongo', () => {
    const config = {
        port: 4000,
        url: 'http://test.com',
        name: 'test'
    };

    describe('Mongo Connection', () => {
        it('Should connect mongo successfully', async () => {
            const stub = sinon.stub(mongoose, 'connect').returns(
                new Promise((resolve) => resolve({}), )
            );

            const success = await connectMongo(config, mongoose);
            expect(success).equals(true);
            stub.restore();
        });

        it('Should throw error on unsuccessful connection', async () => {
            const stub = sinon.stub(mongoose, 'connect').returns(
                new Promise((resolve, reject) => reject(Error('Couldnt connect to mongo')), )
            );

            const success = await connectMongo(config, mongoose);
            expect(success).equals(false);
            stub.restore();
        });
    });

    describe('Mongo localhost connection', () => {
        it('Should be successful connection', async () => {
            _.update(config, configEnum.DB_URL, () => 'mongodb://localhost:27017');
            _.update(config, configEnum.DB_NAME, () => 'test');
            const success = await connectMongo(config, mongoose);
            expect(success).equals(true);
        });
    });

});
