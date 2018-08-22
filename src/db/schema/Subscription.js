import mongoose, {
  Schema,
} from 'mongoose';

const Subscription = new Schema({
  plan: {
    type: Schema.Types.String,
    required: true,
  },
  planId: {
    type: Schema.Types.String,
    required: true,
  },
  startedAt: {
    type: Schema.Types.Date,
    required: true,
  },
  isPaused: {
    type: Schema.Types.Boolean,
    required: true,
  },
});

export default mongoose.model('Subscription', Subscription);
