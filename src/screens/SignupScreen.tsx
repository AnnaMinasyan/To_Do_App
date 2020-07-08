import React from 'react';
import {View, StyleSheet, TextInput, Text, ScrollView} from 'react-native';
import {Button} from 'native-base';

import Logo from '../assets/icons/logo.svg';

import {NavigationScreenProp} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 72,
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 96,
  },
  input: {
    width: 296,
    height: 40,
    marginBottom: 20,
    paddingLeft: 16,
    fontSize: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e1e5e9',
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 296,
    height: 40,
    backgroundColor: '#0088cc',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});

const SignupScreen: React.FunctionComponent<Props> = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Logo style={styles.logo} />

        <View>
          <TextInput
            style={styles.input}
            placeholder="Логин"
            placeholderTextColor="#99aaaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            placeholderTextColor="#99aaaa"
            secureTextEntry
          />

          <Button
            rounded
            block
            style={styles.button}
            onPress={() => navigation.navigate('StartScreen')}>
            <Text style={styles.buttonText}>Войти</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
