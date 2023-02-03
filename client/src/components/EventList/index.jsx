import React from 'react';
import { Container } from '@chakra-ui/react';
import EventListItem from '../EventListItem';

function EventList() {
  const events = [
    {
      title: 'Meteor meet-up',
      description: 'Discussing all things Meteor',
      date: '02.09.2018',
    },
    {
      title: 'Meteor - React',
      description: 'Follow up to build on knowledge of Meteor and React',
      date: '13.09.2018',
    },
    {
      title: 'CSS',
      description: 'Coz we need some styling :)',
      date: '25.09.2018',
    },
  ];

  return (
    <Container minW="container.md">
      {events.map((e, i) => {
        return <EventListItem {...e} key={i} />;
      })}
    </Container>
  );
}

export default EventList;
