import { useNavigate } from 'react-router-dom';
import { Button, Title, Text, Paper } from '@mantine/core';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
    height: '100vh',
    overflow: 'hidden',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
      }}
    >
      <Paper
        shadow="md"
        radius="md"
        p="xl"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          textAlign: 'center',
          maxWidth: 500,
        }}
      >
        <Title order={2} mb="md">
          Welcome to the Food Explorer!
        </Title>
        <Text mb="md">
          Discover cuisines from all around the world. Explore a wide variety of food categories and find detailed
          information about your favorite meals. Whether you're a chef or just hungry, this app brings flavor to your
          screen.
        </Text>
        <Button size="md" onClick={() => navigate('/categories')} fullWidth>
          Explore Food Categories
        </Button>
      </Paper>
    </div>
  );
};

export default Landing;
