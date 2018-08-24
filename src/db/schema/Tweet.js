import mongoose, {
  Schema,
} from 'mongoose';
import {
  prepare
} from '../../utils';

const TweetSchema = new Schema({
  body: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Schema.Types.Date,
    default: Date.now,
    required: true,
  },
}, {
  toObject: {
    transform: (doc, ret) => prepare(ret),
  }
});

const Tweet = mongoose.model('Tweet', TweetSchema);
export default Tweet;
