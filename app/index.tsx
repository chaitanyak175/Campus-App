import { Stack, Link } from 'expo-router';
import React from 'react';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { Text } from 'react-native';

export default function Home() {
  return (
    <React.Fragment>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Text className="bg-cyan-500 p-3 text-2xl font-bold">this is the test text.</Text>
      </Container>
    </React.Fragment>
  );
}
