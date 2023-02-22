import React from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Button, Card, Container, Input, Stack, Text } from '@chakra-ui/react';
import { addEvent } from '../../actions/actions';
import LocationInput from '../LocationInput';
import ParticipantsInput from '../ParticipantsInput';

function EventForm() {
  const [saveEvent, { loading, error, data }] = addEvent();

  const onSubmit = async (values) => {
    console.log(values);

    // await saveEvent({ variables: values });
  };

  const AddButton = () => (
    <Container>
      <Button colorScheme="blue" type="submit">
        Add Event
      </Button>
    </Container>
  );

  const formikValue = useFormik({
    initialValues: {
      title: '',
      desc: '',
      date: '',
      location_id: 0,
      participants: [],
    },
    onSubmit: onSubmit,
  });

  const { handleSubmit, handleChange, handleBlur, values } = formikValue;
  const handleSet = { values, handleChange, handleBlur };

  return (
    <Container bgColor="blackAlpha.200" p="4" fontWeight="semibold" my="10">
      <FormikProvider value={formikValue}>
        <form onSubmit={handleSubmit}>
          <Stack direction="column" spacing="4">
            <Container>
              <Text>Title:</Text>
              <Card>
                <Input
                  name="title"
                  placeholder="Enter event title"
                  bgColor="white"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Card>
            </Container>
            <Container>
              <Text>Description:</Text>
              <Card>
                <Input
                  name="desc"
                  placeholder="Enter event description"
                  bgColor="white"
                  value={values.desc}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Card>
            </Container>
            <Container>
              <Text>Event Date:</Text>
              <Card>
                <Input
                  name="date"
                  bgColor="white"
                  type="datetime-local"
                  value={values.date}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Card>
            </Container>
            <LocationInput {...handleSet} />
            <ParticipantsInput />
            <AddButton />
          </Stack>
        </form>
      </FormikProvider>
    </Container>
  );
}

export default EventForm;
