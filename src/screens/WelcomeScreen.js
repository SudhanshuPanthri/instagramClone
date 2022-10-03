import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

const WelcomeScreen = ({navigation}) => {
  const [userLogged, setUserLogged] = useState(null);

  const checkUser = async () => {
    await auth().onAuthStateChanged(user => {
      if (user) {
        setUserLogged(user);
        navigation.navigate('BottomTabNavigation');
      } else {
        setUserLogged(null);
      }
    });
  };

  useEffect(() => {
    checkUser();
  }, [userLogged]);

  return (
    <View style={styles.parent}>
      <View
        style={{
          padding: 20,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/logo.png')}
          style={{width: 300, height: 85}}
        />
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <TouchableOpacity
          style={{
            width: '85%',
            backgroundColor: '#405DE6',
            padding: 15,
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('SignInScreen')}>
          <Text style={{color: '#fff', fontWeight: '600', letterSpacing: 0.67}}>
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '85%',
            backgroundColor: '#405DE6',
            padding: 15,
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={{color: '#fff', fontWeight: '600', letterSpacing: 0.67}}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
