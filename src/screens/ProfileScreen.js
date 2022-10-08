import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {firebase} from '../firebase/FirebaseConfig';
import auth from '@react-native-firebase/auth';

const ProfileScreen = ({navigation, route}) => {
  const [currentUser, setCurrentUser] = useState([]);
  const [userPosts, setUserPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [follow, setFollow] = useState(false);

  const data = route.params;
  const fetchUserDetails = async () => {
    const userRef = await firebase
      .firestore()
      .collection('UserData')
      .where('uid', '==', data);
    const user = await userRef.get();
    if (!user.empty) {
      user.forEach(doc => {
        setCurrentUser(doc.data());
      });
    }

    await firebase
      .firestore()
      .collection('post')
      .doc(data)
      .collection('userPosts')
      .orderBy('creation', 'desc')
      .get()
      .then(snapshot => {
        setUserPosts(snapshot.docs);
        setLoading(false);
      });
  };

  //function to follow user
  const followUser = async () => {
    await firebase
      .firestore()
      .collection('following')
      .doc(auth().currentUser.uid)
      .collection('userFollowing')
      .doc(data)
      .set({data});
    setFollow(true);
  };

  //function to unfollow user

  const unfollowUser = async () => {
    await firebase
      .firestore()
      .collection('following')
      .doc(auth().currentUser.uid)
      .collection('userFollowing')
      .doc(data)
      .delete();
    setFollow(false);
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userPosts]);

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
              {currentUser.name}
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
              <Text style={{color: '#fff'}}>{currentUser.name}</Text>
              <Text style={{color: '#fff'}}>Hi, i'm using instagram clone</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            {data == auth().currentUser.uid ? (
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
            ) : null}
            {data !== auth().currentUser.uid ? (
              <View>
                {!follow ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#405DE6',
                      padding: 10,
                      marginBottom: 20,
                      width: 150,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 20,
                      borderRadius: 12,
                    }}
                    onPress={() => followUser()}>
                    <Text
                      style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
                      Follow
                    </Text>
                  </TouchableOpacity>
                ) : (
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
                    onPress={() => unfollowUser()}>
                    <Text
                      style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
                      Unfollow
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
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

export default ProfileScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#000',
  },
});
