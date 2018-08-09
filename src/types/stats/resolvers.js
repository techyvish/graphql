import { ObjectId } from 'mongodb';
import DataLoader from 'dataloader';
import { prepare } from '../../utils';

export const getStatsForTweet = (statsRepository, keys) => {
  return Promise.resolve(
    keys.map(async (id) => {
      const statsData = await statsRepository.findQuery({ tweet_id: new ObjectId(id) });
      const stats = await statsData.toArray();
      if (stats[0] === undefined || stats[0] === null ) {
        return null;
      }
      return prepare(stats[0]);
    })
  );
};

export const dataloaders = (statsRepository) =>  ({
  statForTweet: new DataLoader(
    keys => getStatsForTweet(statsRepository, keys),
    {cacheKeyFn: key => key.toString()},
  ),
});