import mongoose, {
  Schema,
} from 'mongoose';
import {
  prepare
} from '../../utils';

const Address = new Schema({
  street1: {
    type: Schema.Types.String,
  },
  street2: {
    type: Schema.Types.String,
  },
  city: {
    type: Schema.Types.String,
  },
  state: {
    type: Schema.Types.String,
  },
  pin: {
    type: Schema.Types.String,
  },
  country: {
    type: Schema.Types.String,
  },
  isHidden: {
    type: Schema.Types.Boolean,
    default: false,
  },
});

const UserSchema = new Schema({
  firstName: {
    type: Schema.Types.String,
    required: true,
  },
  lastName: {
    type: Schema.Types.String,
    required: true,
  },
  gender: {
    type: Schema.Types.String,
    required: true,
    enum: ['male', 'female'],
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  dateOfBirth: {
    type: Schema.Types.Date,
    required: true,
  },
  dateAdded: {
    type: Schema.Types.Date,
    default: Date.now,
    required: true,
  },
  title: {
    type: Schema.Types.String,
  },
  description: {
    type: Schema.Types.String,
  },
  imageUrls: {
    type: [Schema.Types.String],
  },
  subscription: {
    type: Schema.Types.ObjectId,
    ref: 'Subscription',
  },
  address: Address,
  mobile: {
    type: Schema.Types.String,
  },
  mobileVerified: {
    type: Schema.Types.Boolean,
  },
  otp: {
    type: Schema.Types.Number,
    default: parseInt('0', 0),
  },
  height: {
    type: Schema.Types.String,
  },
  community: {
    type: Schema.Types.String,
  },
  language: {
    type: Schema.Types.String,
  },
  registrationStatus: {
    type: Schema.Types.String,
    enum: [
      'unknown',
      'registered',
      'verified',
      'complete',
    ],
    default: 'unknown',
  },
}, {
  toObject: {
    transform: (doc, ret) => prepare(ret),
  }
});

const User = mongoose.model('User', UserSchema);
export default User;
