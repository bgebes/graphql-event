import { eventMutations } from '../Event/index.js';
import { locationMutations } from '../Location/index.js';
import { participantMutations } from '../Participant/index.js';
import { userMutations } from '../User/index.js';

export const Mutation = {
  ...userMutations,
  ...eventMutations,
  ...locationMutations,
  ...participantMutations,
};
