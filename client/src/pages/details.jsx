import { useParams } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Container,
  Spinner,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { getEventById } from '../actions/actions';

function Details() {
  const { id } = useParams();

  const { loading, error, data } = getEventById(id);

  if (loading) {
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }

  const titleSection = (
    <Text fontSize="xl" textColor="blackAlpha.800">
      {data.event.title}
    </Text>
  );

  const dateSection = (
    <Container display="flex" justifyContent="end">
      {data.event.date}
    </Container>
  );

  const descriptionSection = (
    <Box mb="2">
      <Text>{data.event.desc}</Text>
    </Box>
  );

  const eventCreatorSection = (
    <Stack direction="row">
      <Text as="b">Etkinlik Sahibi: </Text>
      <Text>{data.event.user.username}</Text>
      <Text>{`<${data.event.user.email}>`}</Text>
    </Stack>
  );

  const locationSection = (
    <Stack direction="row">
      <Text as="b">Etkinlik Konumu: </Text>
      <Text>{data.event.location.name}</Text>
    </Stack>
  );

  const participantsSection = (
    <TableContainer>
      <Table variant="simple">
        <TableCaption placement="top" my={3}>
          Etkinlik Katılımcıları
        </TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Kullanıcı Adı</Th>
            <Th>Email Adresi</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.event.participants.map((p, i) => {
            return (
              <Tr>
                <Td>{i}</Td>
                <Td>{p.user.username}</Td>
                <Td>{p.user.email}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );

  return (
    <Box m="4" textColor="blackAlpha.600" fontWeight="semibold">
      <Stack direction="row" justify="space-between">
        {titleSection}
        {dateSection}
      </Stack>
      {descriptionSection}
      {eventCreatorSection}
      {locationSection}
      {data.event.participants.length > 0 && participantsSection}
    </Box>
  );
}

export default Details;
