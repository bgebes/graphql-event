import React from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Button, Card, Container, Input, Stack, Text } from '@chakra-ui/react';
import { addEvent } from '../../actions/actions';
import LocationInput from '../LocationInput';
import UserInput from '../UserInput';
import ErrorView from '../ErrorView';

function EventForm() {
  const [saveEvent, { loading, error, data }] = addEvent();

  if (error) {
    return <ErrorView error={error} />;
  }

  const onSubmit = async (values) => {
    console.log(values);

    await saveEvent({
      variables: {
        data: values,
      },
    });
  };

  const AddButton = () => (
    <Container>
      <Button isLoading={loading} colorScheme="blue" type="submit">
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
      user_id: 0,
    },
    onSubmit: onSubmit,
  });

  const { handleSubmit, handleChange, handleBlur, values } = formikValue;
  const handleSet = {
    values,
    handleChange,
    handleBlur,
    sendingLoading: loading,
  };

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
                  required
                  disabled={loading}
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
                  required
                  disabled={loading}
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
                  required
                  disabled={loading}
                />
              </Card>
            </Container>
            <LocationInput {...handleSet} />
            <UserInput {...handleSet} />
            <AddButton />
          </Stack>
        </form>
      </FormikProvider>
    </Container>
  );
}

export default EventForm;
