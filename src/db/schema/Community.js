import mongoose, {
  Schema,
} from 'mongoose';
import {
  prepare
} from '../../utils';

const LocationSchema = new Schema({
  name: String,
  loc: {
    type: [Schema.Types.Number], // [<longitude>, <latitude>]
    index: '2d', // create the geo spatial index
  },
});

const Address = new Schema({
  placeId: {
    type: Schema.Types.String,
    required: true,
  },
  street1: {
    type: Schema.Types.String,
    required: true,
  },
  street2: {
    type: Schema.Types.String,
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
  location: LocationSchema,
});

const Community = new Schema({
  cuid: {
    type: Schema.Types.String,
    required: true,
  },
  ownerFirstName: {
    type: Schema.Types.String,
  },
  ownerLastName: {
    type: Schema.Types.String,
  },
  ownerImageUrl: {
    type: Schema.Types.String,
    required: true,
  },
  phone: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  address: Address,
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
  verified: {
    type: Schema.Types.String,
    required: true,
  },
}, {
  toObject: {
    transform: (doc, ret) => prepare(ret),
  }
});

export default mongoose.model('Community', Community);
