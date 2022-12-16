import { userSubscriptions } from '../User/index.js';
import { eventSubscriptions } from '../Event/index.js';
import { participantSubscriptions } from '../Participant/index.js';

export const Subscription = {
  ...userSubscriptions,
  ...eventSubscriptions,
  ...participantSubscriptions,
};
