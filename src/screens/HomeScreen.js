import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {firebase} from '../firebase/FirebaseConfig';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import Story from '../components/Story';
import {users} from '../data/userData';
import Post from '../components/Post';
import post from '../components/Post';

const HomeScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [cameraImage, setCameraImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [followingUsers, setFollowingUsers] = useState([]);
  let name = '';

  //function to fetch user posts the current user follows
  const fetchFollowingUsers = async () => {
    await firebase
      .firestore()
      .collection('following')
      .doc(auth().currentUser.uid)
      .collection('userFollowing')
      .get()
      .then(snapshot => {
        setFollowingUsers(snapshot.docs);
      });
  };
  // function to open camera
  //   camera options

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openCamera = async () => {
    const cameraPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (cameraPermission === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setCameraImage(result.assets[0].uri);
    }
  };

  // function to open photo album

  const openPhotoAlbum = async () => {
    const result = await launchImageLibrary(options);
    setCameraImage(result.assets[0].uri);
  };

  // function to upload data to firebase
  const uploadData = async () => {
    const response = await fetch(cameraImage);
    const blob = await response.blob();
    const task = storage()
      .ref()
      .child(`post/${auth().currentUser.uid}/${Math.random().toString(36)}`)
      .put(blob);

    const taskProgress = snapshot => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = snapshot => {
      snapshot.ref.getDownloadURL().then(snapshot => {
        savePostData(snapshot);
      });
    };
    const taskError = snapshot => {
      console.log(snapshot);
    };

    task.on('state_changed', taskProgress, taskError, taskCompleted);
  };

  //function to save caption and image as postData

  const savePostData = async downloadURL => {
    await firebase
      .firestore()
      .collection('UserData')
      .where('uid', '==', auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          name = doc.data().name;
        });
      });
    await firebase
      .firestore()
      .collection('post')
      .doc(auth().currentUser.uid)
      .collection('userPosts')
      .add({
        postedBy: name,
        downloadURL,
        caption,
        creation: new Date().getMilliseconds().toString(),
      })
      .then(() => {
        console.log('done');
      });
  };

  //function to open modal
  const OpenModal = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            setShowModal(!showModal);
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 520,
              width: '100%',
              // justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#000',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}>
            <View
              style={{
                height: '20%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
                // marginTop: 20,
              }}>
              <View style={{width: '20%'}}>
                <Image
                  source={require('../assets/user3.jpg')}
                  style={{height: 45, width: 45, borderRadius: 50}}
                />
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderBottomColor: '#fff',
                  width: '60%',
                }}>
                <TextInput
                  placeholder="Write a caption..."
                  placeholderTextColor="#fff"
                  style={{color: '#fff'}}
                  onChangeText={text => setCaption(text)}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(!showModal);
                  uploadData();
                }}>
                <Text style={{color: '#405DE6'}}>Post</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '60%',
                height: '40%',
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {cameraImage !== null ? (
                <Image
                  source={{uri: cameraImage}}
                  style={{height: '100%', width: '100%', borderRadius: 50}}
                />
              ) : (
                <Text style={{color: '#fff'}}>
                  Select an image from camera or photo gallery to upload
                </Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-evenly',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 50,
                }}
                onPress={() => openCamera()}>
                <Image
                  source={require('../assets/camera.png')}
                  style={{height: 40, width: 40}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 50,
                  height: 50,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => openPhotoAlbum()}>
                <Image
                  source={require('../assets/album.png')}
                  style={{height: 25, width: 25}}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                width: 50,
                borderRadius: 50,
                marginTop: 40,
              }}
              onPress={() => setShowModal(!showModal)}>
              <Image
                source={require('../assets/close.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };

  useEffect(() => {
    fetchFollowingUsers();
  }, []);

  return (
    <View style={styles.parent}>
      {/*header section*/}
      <View style={styles.header}>
        <View
          style={{
            height: '100%',
            width: '65%',
            justifyContent: 'center',
            marginLeft: 15,
          }}>
          <Image
            source={require('../assets/logo.png')}
            style={{width: '45%', height: '45%'}}
          />
        </View>
        <OpenModal />
        {/*{console.log(followingUsers)}*/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: '100%',
            width: '35%',
          }}>
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
              OpenModal();
            }}>
            <Image
              source={require('../assets/addpost.png')}
              style={{width: 30, height: 30, tintColor: '#fff'}}
            />
          </TouchableOpacity>
          {/*<TouchableOpacity>*/}
          {/*  <Image*/}
          {/*    source={require('../assets/dm.png')}*/}
          {/*    style={{width: 30, height: 30, tintColor: '#fff'}}*/}
          {/*  />*/}
          {/*</TouchableOpacity>*/}
          {/*<View style={styles.messageCounter}>*/}
          {/*  <Text style={{color: '#fff', fontWeight: '600'}}>4</Text>*/}
          {/*</View>*/}
        </View>
      </View>
      {/*stories section ye scroll hongi*/}
      <ScrollView vertical={true} showVerticalScrollIndicator={false}>
        <ScrollView style={styles.stories}>
          <FlatList
            data={users}
            keyExtractor={item => item.id}
            renderItem={item => <Story user={item} />}
            horizontal={true}
          />
        </ScrollView>
        {/*posts.js aengi idhar*/}
        <FlatList
          data={followingUsers}
          renderItem={data => <Post postDetails={data.item} />}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stories: {
    width: '100%',
  },
  messageCounter: {
    height: 22,
    width: 22,
    borderRadius: 50,
    position: 'absolute',
    right: 20,
    top: 15,
    backgroundColor: '#fb3958',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
