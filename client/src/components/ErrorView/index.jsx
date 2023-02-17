import { Alert, AlertIcon } from '@chakra-ui/react';

function ErrorView({ error }) {
  return (
    <Alert status="error">
      <AlertIcon />
      {error.message}
    </Alert>
  );
}

export default ErrorView;
