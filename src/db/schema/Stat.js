import mongoose, {
  Schema,
} from 'mongoose';

const Stat = new Schema({
  views: Schema.Types.Number,
  likes: Schema.Types.Number,
  tweet_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model('Stat', Stat);
