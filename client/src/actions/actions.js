import { useQuery } from '@apollo/client';
import { GET_EVENTS, GET_EVENT_BYID } from '../apollo/queries/queries';

export const getEvents = () => {
  const { loading, error, data } = useQuery(GET_EVENTS);
  return { loading, error, data };
};

export const getEventById = (id) => {
  const { loading, error, data } = useQuery(GET_EVENT_BYID, {
    variables: { id },
  });

  return { loading, error, data };
};
