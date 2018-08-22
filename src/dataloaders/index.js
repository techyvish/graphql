import {
  dataloaders as statDataloaders
} from '../types/stats/resolvers';

const buildDataLoaders = repositories => ({
  ...statDataloaders(repositories.statsRepository),
});

export default buildDataLoaders;
