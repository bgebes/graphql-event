import { Query } from './_Query_/index.js';
import { Mutation } from './_Mutation_/index.js';
import { Subscription } from './_Subscription_/index.js';
import { Event } from './Event/index.js';
import { Participant } from './Participant/index.js';

export const resolvers = {
  Query,
  Mutation,
  Subscription,
  Event,
  Participant,
};
