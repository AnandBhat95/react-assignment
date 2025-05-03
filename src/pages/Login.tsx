import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput, Card, Container, Title, Text } from '@mantine/core';
import { useAppStore } from '../store/app.store';

const Login = () => {
  const navigate = useNavigate();
  const setLoggedIn = useAppStore((state) => state.setLoggedIn);
  const setUsername = useAppStore((state) => state.setUsername);
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);

  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/categories');
    }
  }, [isLoggedIn, navigate]);

  const validateForm = () => {
    let valid = true;

    if (inputUsername.trim() === '') {
      setUsernameError('Username is required');
      valid = false;
    } else {
      setUsernameError('');
    }

    if (inputPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      setLoggedIn(true);
      setUsername(inputUsername);
      navigate('/categories');
    }
  };

  const isFormValid = inputUsername.trim() !== '' && inputPassword.length >= 6;

  return (
    <Container
      size="xs"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <Title order={2} align="center" mb="lg">
          Login
        </Title>

        <TextInput
          label="Username"
          placeholder="Enter username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.currentTarget.value)}
          error={usernameError}
          mb="md"
        />

        <TextInput
          label="Password"
          placeholder="Enter password"
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.currentTarget.value)}
          error={passwordError}
          mb="md"
        />

        <Button fullWidth onClick={handleLogin} disabled={!isFormValid}>
          Log In
        </Button>
      </Card>
    </Container>
  );
};

export default Login;
