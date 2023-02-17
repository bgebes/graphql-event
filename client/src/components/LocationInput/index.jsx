import { Card, Container, Select, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { getLocations } from '../../actions/actions';
import ErrorView from '../ErrorView';
import LoadingView from '../LoadingView';

function LocationInput() {
  const [selected, setSelected] = useState({});
  const { loading, error, data } = getLocations();

  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView />;
  }

  const onSelected = (e) => {
    const { value } = e.target;
    const location = data.locations.find((l) => l.id == value);

    setSelected(location);
  };

  const selectView = (
    <Select placeholder="Select location" onChange={onSelected}>
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
