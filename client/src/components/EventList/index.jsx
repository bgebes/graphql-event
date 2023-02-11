import React, { useEffect } from 'react';
import EventListItem from '../EventListItem';
import { Alert, AlertIcon, Center, Container, Spinner } from '@chakra-ui/react';
import { ADD_EVENT_SUBSCRIPTION } from '../../apollo/subscriptions/subscriptions';
import { getEvents } from '../../actions/actions';

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
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );
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
