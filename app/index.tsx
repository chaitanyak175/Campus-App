import { Stack, Link } from 'expo-router';
import React, { useState } from 'react';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import { FirebaseError } from 'firebase/app';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      alert('Check you emails!');
    } catch (error: any) {
      const err = error as FirebaseError;
      alert('Registration Failed' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('The User is now logged in.');
    } catch (error: any) {
      const err = error as FirebaseError;
      alert('Registration Failed' + err.message);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center">
        <KeyboardAvoidingView behavior="padding">
          <View className="mt-80 pt-12">
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              keyboardType="email-address"
              secureTextEntry
            />
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
                <Button onPress={signUp} title="Sign Up" className="m-4" />
                <Button onPress={signIn} title="Sign In" className="m-4" />
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 6,
    width: 350,
  },
});
