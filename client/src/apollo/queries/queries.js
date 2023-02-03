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

export const GET_EVENT_BYID = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      id
      title
      desc
      date
      user {
        username
        email
      }
      location {
        name
      }
      participants {
        user {
          username
          email
        }
      }
    }
  }
`;
