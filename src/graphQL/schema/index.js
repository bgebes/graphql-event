import { addEventInput, typeEvent, updateEventInput } from './Event/index.js';
import { addUserInput, typeUser, updateUserInput } from './User/index.js';
import {
  addLocationInput,
  typeLocation,
  updateLocationInput,
} from './Location/index.js';
import {
  addParticipantInput,
  typeParticipant,
  updateParticipantInput,
} from './Participant/index.js';
import { query } from './_Query_/index.js';
import { mutation } from './_Mutation_/index.js';
import { subscription } from './_Subscription_/index.js';

export const typeDefs = `
  # Event

  ${typeEvent}
  ${addEventInput}
  ${updateEventInput}

  # Location

  ${typeLocation}
  ${addLocationInput}
  ${updateLocationInput}

  # User

  ${typeUser}
  ${addUserInput}
  ${updateUserInput}

  # Participant

  ${typeParticipant}
  ${addParticipantInput}
  ${updateParticipantInput}

  type deleteAllOfListOutput {
    count: Int!
  }

  ${query}
  ${mutation}
  ${subscription}
`;
