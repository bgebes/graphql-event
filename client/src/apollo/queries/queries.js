import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query getEvents {
    events {
      id
      title
      desc
      date
    }
  }
`;
