import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../apollo/queries/queries';

export const getEvents = () => {
  const { loading, error, data } = useQuery(GET_EVENTS);
  return { loading, error, data };
};
