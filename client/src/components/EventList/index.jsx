import React from 'react';
import EventListItem from '../EventListItem';
import { Alert, AlertIcon, Center, Container, Spinner } from '@chakra-ui/react';
import { getEvents } from '../../actions/actions';

function EventList() {
  const { loading, error, data } = getEvents();

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
