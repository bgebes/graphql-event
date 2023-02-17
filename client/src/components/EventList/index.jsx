import React, { useEffect } from 'react';
import EventListItem from '../EventListItem';
import { Container } from '@chakra-ui/react';
import { ADD_EVENT_SUBSCRIPTION } from '../../apollo/subscriptions/subscriptions';
import { getEvents } from '../../actions/actions';
import LoadingView from '../LoadingView';
import ErrorView from '../ErrorView';

function EventList() {
  const { loading, error, data, subscribeToMore } = getEvents();

  const subscriptionToNewEvents = subscribeToMore({
    document: ADD_EVENT_SUBSCRIPTION,
    updateQuery: (previous, { subscriptionData }) => {
      if (!subscriptionData.data) return previous;

      const newItem = subscriptionData.data.eventCreated;
      return {
        ...previous,
        events: [...previous.events, newItem],
      };
    },
  });

  useEffect(() => {
    subscriptionToNewEvents();
  }, []);

  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView />;
  }

  return (
    <Container minW="container.md">
      {data.events.map((e, i) => {
        return <EventListItem {...e} key={i} />;
      })}
    </Container>
  );
}

export default EventList;
