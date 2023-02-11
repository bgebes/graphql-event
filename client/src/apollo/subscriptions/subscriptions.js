import { gql } from '@apollo/client';

export const ADD_EVENT_SUBSCRIPTION = gql`
  subscription eventCreated {
    eventCreated {
      id
      title
      desc
      date
    }
  }
`;
