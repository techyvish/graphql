
import { dataloaders as statDataloaders } from '../types/stats/resolvers';
import db from '../db';

const buildDataLoaders = (repositories) => ({
    ...statDataloaders(repositories.statsRepository)
});

export default buildDataLoaders;