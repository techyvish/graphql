import mongoose, {
  Schema,
} from 'mongoose';
import {
  prepare
} from '../../utils';

const StatSchema = new Schema({
  views: Schema.Types.Number,
  likes: Schema.Types.Number,
  tweet_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
}, {
  toObject: {
    transform: (doc, ret) => prepare(ret),
  }
});

export default mongoose.model('Stat', StatSchema);
