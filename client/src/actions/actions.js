import { useQuery } from '@apollo/client';
import {
  GET_EVENTS,
  GET_EVENT_BYID,
  GET_LOCATIONS,
  GET_USERS,
} from '../apollo/queries/queries';

export const getEvents = () => useQuery(GET_EVENTS);

export const getEventById = (id) => {
  return useQuery(GET_EVENT_BYID, {
    variables: { id },
  });
};

export const getUsers = () => useQuery(GET_USERS);
export const getLocations = () => useQuery(GET_LOCATIONS);
