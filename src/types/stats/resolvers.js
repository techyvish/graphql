import {
  ObjectId
} from 'mongodb';
import DataLoader from 'dataloader';

export const getStatsForTweet = (statsRepository, keys) => Promise.resolve(
  keys.map(async (id) => {
    const stats = await statsRepository.findQuery({
      tweet_id: new ObjectId(id),
    });
    if (stats === null) {
      return null;
    }
    if (stats[0] === undefined || stats[0] === null) {
      return null;
    }
    return stats[0];
  }),
);

export function dataloaders(statsRepository) {
  const dataloader = new DataLoader(keys => getStatsForTweet(statsRepository, keys), {
    cacheKeyFn: key => key.toString(),
  });
  return {
    statForTweet: dataloader,
  };
}
