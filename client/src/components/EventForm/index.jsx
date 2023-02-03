import { Button, Container, Input, Stack, Text } from '@chakra-ui/react';
import React from 'react';

function EventForm() {
  const titleInput = (
    <Container>
      <Text>Title:</Text>
      <Input placeholder="Enter event title" bgColor="white" />
    </Container>
  );

  const descriptionInput = (
    <Container>
      <Text>Description:</Text>
      <Input placeholder="Enter event description" bgColor="white" />
    </Container>
  );

  const dateInput = (
    <Container>
      <Text>Event Date:</Text>
      <Input bgColor="white" type="date" />
    </Container>
  );

  const addButton = (
    <Container>
      <Button colorScheme="blue">Add Event</Button>
    </Container>
  );

  return (
    <Container bgColor="blackAlpha.200" p="4" fontWeight="semibold" my="10">
      <Stack direction="column" spacing="4">
        {titleInput}
        {descriptionInput}
        {dateInput}
        {addButton}
      </Stack>
    </Container>
  );
}

export default EventForm;
