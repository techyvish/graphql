import mongoose, {
  Schema,
} from 'mongoose';

const Tweet = new Schema({
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
});

export default mongoose.model('Tweet', Tweet);
