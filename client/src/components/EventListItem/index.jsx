import { Card, Container, Stack, Text } from '@chakra-ui/react';
import React from 'react';

function EventListItem({ title, description, date }) {
  const titleSection = (
    <Stack>
      <Text fontSize="xl" textColor="blackAlpha.800">
        {title}
      </Text>
      <Text>{description}</Text>
    </Stack>
  );

  const dateSection = <small>{date}</small>;

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
