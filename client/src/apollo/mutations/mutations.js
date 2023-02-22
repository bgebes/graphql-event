import { gql } from '@apollo/client';

export const ADD_EVENT = gql`
  mutation addEvent($data: addEventInput!) {
    addEvent(data: $data) {
      id
      title
      desc
      date
    }
  }
`;
