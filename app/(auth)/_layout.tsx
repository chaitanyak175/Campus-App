import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="Home" />
    </Stack>
  );
};

export default Layout;
