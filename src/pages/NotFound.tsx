import { Container, Title, Text, Center } from '@mantine/core';

const NotFound = () => {
  return (
    <Center style={{ height: '100vh' }}>
      <Container style={{ textAlign: 'center' }}>
        <Title order={1} color="red">
          404 - Page Not Found
        </Title>
        <Text color="gray">The page you're looking for doesn't exist.</Text>
      </Container>
    </Center>
  );
};

export default NotFound;
