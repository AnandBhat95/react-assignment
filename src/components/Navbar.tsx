import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Header, Modal, Text } from '@mantine/core';
import { useAppStore } from '../store/app.store';
import { IconArrowLeft } from '@tabler/icons-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(true);
  const [modalOpened, setModalOpened] = useState(false); // Modal state
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  const setLoggedIn = useAppStore((state) => state.setLoggedIn);
  const username = useAppStore((state) => state.username);

  const toggleTheme = () => setTheme((prev) => !prev);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <>
      <Header
        height={60}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'whitesmoke',
          borderBottom: '1px solid #90caf9',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            padding: '0 20px',
          }}
        >
          <Button
            variant="subtle"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate('/categories');
              }
            }}
            compact
            styles={{
              root: {
                color: '#1565c0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              },
            }}
          >
            <IconArrowLeft size={28} />
          </Button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isLoggedIn && username && (
              <span style={{ color: '#1565c0', fontWeight: 500 }}>
                Hello, {username}
              </span>
            )}
            <Button
              variant="outline"
              compact
              onClick={() => {
                if (isLoggedIn) {
                  navigate('/game');
                } else {
                  setModalOpened(true); // Open modal
                }
              }}
              styles={{
                root: {
                  borderColor: '#1565c0',
                  color: '#1565c0',
                },
              }}
            >
              Play a Game
            </Button>

            {isLoggedIn ? (
              <Button
                variant="outline"
                compact
                onClick={handleLogout}
                styles={{
                  root: {
                    borderColor: '#1565c0',
                    color: '#1565c0',
                  },
                }}
              >
                Log Out
              </Button>
            ) : (
              <Button
                variant="outline"
                compact
                onClick={() => navigate('/login')}
                styles={{
                  root: {
                    borderColor: '#1565c0',
                    color: '#1565c0',
                  },
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </Header>

      {/* Login-required Modal */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Login Required"
        centered
      >
        <Text>Please log in to play the food guessing game.</Text>
        <Button
          onClick={() => {
            setModalOpened(false);
            navigate('/login');
          }}
          mt="md"
          fullWidth
        >
          Go to Login
        </Button>
      </Modal>
    </>
  );
};

export default Navbar;
