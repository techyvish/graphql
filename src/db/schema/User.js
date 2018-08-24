import mongoose, {
  Schema,
} from 'mongoose';
import {
  prepare
} from '../../utils';

const Address = new Schema({
  street1: {
    type: Schema.Types.String,
    required: true,
  },
  street2: {
    type: Schema.Types.String,
    required: true,
  },
  city: {
    type: Schema.Types.String,
    required: true,
  },
  state: {
    type: Schema.Types.String,
    required: true,
  },
  pin: {
    type: Schema.Types.String,
    required: true,
  },
  country: {
    type: Schema.Types.String,
    required: true,
  },
  isHidden: {
    type: Schema.Types.Boolean,
    required: true,
    default: true,
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
  },
  dateAdded: {
    type: Schema.Types.Date,
    default: Date.now,
    required: true,
  },
  title: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
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
    required: true,
  },
  mobileVerified: {
    type: Schema.Types.Boolean,
    required: true,
    default: false,
  },
  otp: {
    type: Schema.Types.Number,
    required: true,
    default: parseInt('0', 0),
  },
  height: {
    type: Schema.Types.String,
    required: true,
  },
  community: {
    type: Schema.Types.String,
    required: true,
  },
  language: {
    type: Schema.Types.String,
    required: true,
  },
  registrationStatus: {
    type: Schema.Types.String,
    required: true,
    enum: [
      'unknown',
      'registered',
      'verified',
      'complete',
    ],
  },
}, {
  toObject: {
    transform: (doc, ret) => prepare(ret),
  }
});

const User = mongoose.model('User', UserSchema);
export default User;
