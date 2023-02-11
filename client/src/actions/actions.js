import { useQuery } from '@apollo/client';
import { GET_EVENTS, GET_EVENT_BYID } from '../apollo/queries/queries';

export const getEvents = () => useQuery(GET_EVENTS);

export const getEventById = (id) => {
  return useQuery(GET_EVENT_BYID, {
    variables: { id },
  });
};
