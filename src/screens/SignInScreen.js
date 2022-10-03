import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        navigation.navigate('HomeScreen', user);
      });
  };

  return (
    <View style={styles.parent}>
      <View
        style={{
          width: '100%',
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/logo.png')}
          style={{width: '45%', height: '50%'}}
        />
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <TextInput
          style={styles.input}
          placeholder="email"
          placeholderTextColor="#fff"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor="#fff"
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          style={{
            width: '85%',
            backgroundColor: '#405DE6',
            padding: 15,
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => signIn()}>
          <Text style={{color: '#fff', fontWeight: '600', letterSpacing: 0.67}}>
            Log in
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
          Doesn't have an account?
        </Text>
        <Pressable
          style={{marginLeft: 10}}
          onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={{color: '#405DE6', fontSize: 16, fontWeight: '500'}}>
            Sign Up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '85%',
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    color: '#fff',
    backgroundColor: '#696969',
  },
  footer: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
  },
});
