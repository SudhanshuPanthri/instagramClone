import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {firebase} from '../firebase/FirebaseConfig';
import auth from '@react-native-firebase/auth';

const AccountScreen = ({navigation}) => {
  const [userDetails, setUserDetails] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  //function to fetch users from firebase

  const fetchUserDetails = async () => {
    const userRef = await firebase
      .firestore()
      .collection('UserData')
      .where('uid', '==', auth().currentUser.uid);
    const user = await userRef.get();
    if (!user.empty) {
      user.forEach(doc => {
        setUserDetails(doc.data());
      });
    }

    await firebase
      .firestore()
      .collection('post')
      .doc(auth().currentUser.uid)
      .collection('userPosts')
      .orderBy('creation', 'desc')
      .get()
      .then(snapshot => {
        setUserPosts(snapshot.docs);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  // function to signout user

  const signOut = async () => {
    await auth()
      .signOut()
      .then(() => {
        console.log('User signed Out');
        navigation.navigate('SignInScreen');
      });
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          }}>
          <Text style={{color: '#fff'}}>Loading</Text>
        </View>
      ) : (
        <View style={styles.parent}>
          <View style={{height: '10%', width: '100%', padding: 10}}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: '500'}}>
              {userDetails.name}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 70,
                width: 70,
                marginBottom: 20,
              }}>
              <Image
                source={require('../assets/user3.jpg')}
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 50,
                  borderWidth: 4,
                  borderColor: '#ae22e0',
                }}
              />
            </View>
            <View style={{marginRight: 80}}>
              <Text style={{color: '#fff'}}>{userDetails.name}</Text>
              <Text style={{color: '#fff'}}>Hi, i'm using instagram clone</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#696969',
                padding: 10,
                marginBottom: 20,
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
              }}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
                Edit profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#696969',
                padding: 10,
                marginBottom: 20,
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
                borderRadius: 12,
              }}
              onPress={() => signOut()}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
          {userPosts.length > 0 ? (
            <View
              style={{
                height: '60%',
                width: '100%',
              }}>
              <FlatList
                data={userPosts}
                numColumns={3}
                vertical={true}
                renderItem={post => (
                  <TouchableOpacity
                    style={{
                      height: 120,
                      width: 120,
                    }}>
                    <Image
                      source={{uri: post.item._data.downloadURL}}
                      style={{height: '100%', width: '100%', aspectRatio: 1}}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            <View
              style={{
                height: '60%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff'}}>User has not created any post</Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#000',
  },
});
