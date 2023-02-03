import { Box, Card, Container, Spacer, Stack, Text } from '@chakra-ui/react';
import React from 'react';

function EventListItem({ title, desc, date }) {
  const titleSection = (
    <Stack>
      <Text fontSize="xl" textColor="blackAlpha.800">
        {title}
      </Text>
      <Text>{desc}</Text>
    </Stack>
  );

  const dateSection = (
    <Container display="flex" justifyContent="end">
      <small>{date}</small>
    </Container>
  );

  return (
    <Card p="4" textColor="blackAlpha.600" fontWeight="semibold">
      <Stack direction="row" justify="space-between">
        {titleSection}
        {dateSection}
      </Stack>
    </Card>
  );
}

export default EventListItem;
