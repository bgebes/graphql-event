import { Button, Card, Container, Input, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import LocationInput from '../LocationInput';
import ParticipantsInput from '../ParticipantsInput';

function EventForm() {
  const titleInput = (
    <Container>
      <Text>Title:</Text>
      <Card>
        <Input placeholder="Enter event title" bgColor="white" />
      </Card>
    </Container>
  );

  const descriptionInput = (
    <Container>
      <Text>Description:</Text>
      <Card>
        <Input placeholder="Enter event description" bgColor="white" />
      </Card>
    </Container>
  );

  const dateInput = (
    <Container>
      <Text>Event Date:</Text>
      <Card>
        <Input bgColor="white" type="datetime-local" />
      </Card>
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
        <LocationInput />
        <ParticipantsInput />
        {addButton}
      </Stack>
    </Container>
  );
}

export default EventForm;
