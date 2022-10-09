import React, {useState, useEffect} from 'react';
import {firebase} from '../firebase/FirebaseConfig';
import auth from '@react-native-firebase/auth';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = async () => {
    if (password !== confirmPassword) {
      alert("Password doesn't match");
    } else {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          if (userCredentials?.user.uid) {
            firebase
              .firestore()
              .collection('UserData')
              .doc(auth().currentUser.uid)
              .set({
                name,
                email,
                password,
                uid: userCredentials?.user.uid,
              });
          }
        });
    }
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
          placeholder="username"
          placeholderTextColor="#fff"
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor="#fff"
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="confirm password"
          placeholderTextColor="#fff"
          onChangeText={text => setConfirmPassword(text)}
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
          onPress={() => signUp()}>
          <Text style={{color: '#fff', fontWeight: '600', letterSpacing: 0.67}}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
          Already have an account?
        </Text>
        <Pressable
          style={{marginLeft: 10}}
          onPress={() => navigation.navigate('SignInScreen')}>
          <Text style={{color: '#405DE6', fontSize: 16, fontWeight: '500'}}>
            Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
