import React from 'react';
import { Card, Container, Select, Text } from '@chakra-ui/react';
import { getLocations } from '../../actions/actions';
import ErrorView from '../ErrorView';
import LoadingView from '../LoadingView';

function LocationInput({ values, handleChange, handleBlur, sendingLoading }) {
  const { loading, error, data } = getLocations();

  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView />;
  }

  const selectView = (
    <Select
      name="location_id"
      placeholder="Select location"
      value={values.location_id}
      onBlur={handleBlur}
      onChange={handleChange}
      required
      disabled={sendingLoading}
    >
      {data.locations &&
        data.locations.map((location, i) => {
          return (
            <option key={i} value={location.id}>
              {location.name}
            </option>
          );
        })}
    </Select>
  );

  return (
    <Container>
      <Text>Locations:</Text>
      <Card bg="white">{selectView}</Card>
    </Container>
  );
}

export default LocationInput;
