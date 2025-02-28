import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import '../global.css';

import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { initializeApp } from 'firebase/app';
import LoadingScreen from './components/LoadingScreen';

export default function Layout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const router = useRouter();
  const segments = useSegments();

  console.log('The user details are : ', user);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log('onAuthStateChanged', user);
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (user && !inAuthGroup) {
      console.log('You are being sent to the Home Screen.');
      router.replace('/(auth)/Home');
    } else if (!user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, initializing]);

  // This is the key change - return the loading screen during initialization
  // instead of letting the router render any screens
  if (initializing) {
    return <LoadingScreen />;
  }

  return (
    <React.Fragment>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </React.Fragment>
  );
}
