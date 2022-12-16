import { userSubscriptionType } from '../User/index.js';
import { eventSubscriptionType } from '../Event/index.js';
import { locationSubscriptionType } from '../Location/index.js';
import { participantSubscriptionType } from '../Participant/index.js';

export const subscription = `
type Subscription {
    ${userSubscriptionType}
    ${eventSubscriptionType}
    ${locationSubscriptionType}
    ${participantSubscriptionType}
}
`;
