import { Box, Card, Container, Spacer, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

function EventListItem({ id, title, desc, date }) {
  const titleSection = (
    <Stack>
      <Text fontSize="xl" textColor="blackAlpha.800" noOfLines={1}>
        {title}
      </Text>
      <Text noOfLines={1}>{desc}</Text>
    </Stack>
  );

  const dateSection = (
    <Container display="flex" justifyContent="end">
      <small>{date}</small>
    </Container>
  );

  return (
    <Link to={`/details/${id}`}>
      <Card p="4" textColor="blackAlpha.600" fontWeight="semibold">
        <Stack direction="row" justify="space-between">
          {titleSection}
          {dateSection}
        </Stack>
      </Card>
    </Link>
  );
}

export default EventListItem;
