import { eventQueries } from '../Event/index.js';
import { locationQueries } from '../Location/index.js';
import { participantQueries } from '../Participant/index.js';
import { userQueries } from '../User/index.js';

export const Query = {
  ...eventQueries,
  ...locationQueries,
  ...userQueries,
  ...participantQueries,
};
