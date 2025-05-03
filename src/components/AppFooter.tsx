import React from 'react';
import { Footer, Text } from '@mantine/core';

const AppFooter = () => {
  return (
    <Footer
      height={40}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'whitesmoke',
        borderTop: '1px solid #90caf9',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 10px',
      }}
    >
      <Text size="sm" color="dimmed">
        © 2025 MyFoodApp
      </Text>
    </Footer>
  );
};

export default AppFooter;
