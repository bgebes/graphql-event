import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Container,
  Select,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { getUsers } from '../../actions/actions';
import ErrorView from '../ErrorView';
import LoadingView from '../LoadingView';

function ParticipantsInput() {
  const [participants, setParticipants] = useState([]);

  const { loading, error, data } = getUsers();

  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView />;
  }

  const onSelected = (e) => {
    const { value } = e.target;
    const participant = data.users.find((u) => u.id == value);

    setParticipants((state) => [...state, participant]);

    e.target.value = '';
  };

  const selectView = (
    <Select placeholder="Select participants" onChange={onSelected}>
      {data.users &&
        data.users.map((user, i) => {
          return (
            <option key={i} value={user.id}>
              {user.username}
            </option>
          );
        })}
    </Select>
  );

  const SelectedUserView = ({ user }) => {
    const { id, username, email } = user;

    return (
      <Checkbox defaultChecked isDisabled>
        {username}
      </Checkbox>
    );
  };

  return (
    <Container>
      <Text>Participants:</Text>
      <Card bg="white">
        <CardHeader>{selectView}</CardHeader>
        {participants.length > 0 && (
          <CardBody>
            <SimpleGrid columns={2}>
              {participants.map((participant, i) => {
                return <SelectedUserView key={i} user={participant} />;
              })}
            </SimpleGrid>
          </CardBody>
        )}
      </Card>
    </Container>
  );
}

export default ParticipantsInput;