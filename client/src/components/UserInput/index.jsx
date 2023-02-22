import React from 'react';
import { Card, Container, Select, Text } from '@chakra-ui/react';
import { getUsers } from '../../actions/actions';
import ErrorView from '../ErrorView';
import LoadingView from '../LoadingView';

function UserInput({ values, handleChange, handleBlur, sendingLoading }) {
  const { loading, error, data } = getUsers();

  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView />;
  }

  const selectView = (
    <Select
      name="user_id"
      placeholder="Select user"
      value={values.user_id}
      onBlur={handleBlur}
      onChange={handleChange}
      required
      disabled={sendingLoading}
    >
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

  return (
    <Container>
      <Text>User:</Text>
      <Card bg="white">{selectView}</Card>
    </Container>
  );
}

export default UserInput;
