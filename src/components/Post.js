import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import {firebase} from '../firebase/FirebaseConfig';
// import auth from '@react-native-firebase/auth';

const Post = user => {
  const [click, setClick] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getAllUserData = async () => {
    await firebase
      .firestore()
      .collection('post')
      .doc(user.postDetails._data.data)
      .collection('userPosts')
      .get()
      .then(snapshot => {
        setPosts(snapshot.docs);
      });
  };

  const comment = async id => {
    await firebase
      .firestore()
      .collection('post')
      .doc(user.postDetails._data.data)
      .collection('userPosts')
      .get()
      .then(snapshot => {
        setCurrentPost(snapshot.docs[id]);
      });
    getComments();
  };

  const addComment = async () => {
    await firebase
      .firestore()
      .collection('post')
      .doc(user.postDetails._data.data)
      .collection('userPosts')
      .doc(currentPost.id)
      .collection('comments')
      .add({comments});
  };

  const getComments = async () => {
    await firebase
      .firestore()
      .collection('post')
      .doc(user.postDetails._data.data)
      .collection('userPosts')
      .doc(currentPost.id)
      .collection('comments')
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          setComments(doc.data());
        });
      });
    // addComment();
  };

  const OpenModal = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 300,
          backgroundColor: '#fff',
          position: 'absolute',
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
              alignItems: 'center',
              backgroundColor: '#000',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}>
            <View>
              <TextInput />
            </View>
            <FlatList
              data={comments.comments}
              renderItem={data => (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#fff',
                    width: 300,
                    marginVertical: 10,
                    justifyContent: 'center',
                    padding: 10,
                  }}>
                  <View>
                    <Text style={{color: '#fff', fontSize: 16}}>
                      {data.item}
                    </Text>
                  </View>
                </View>
              )}
            />
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
    getAllUserData();
  }, []);

  return (
    <>
      <FlatList
        data={posts}
        renderItem={data => (
          <View style={styles.container}>
            <View style={styles.header}>
              <View
                style={{
                  height: '100%',
                  width: '50%',
                  flexDirection: 'row',
                  padding: 10,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/user.png')}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    tintColor: '#fff',
                  }}
                />
                <Text
                  style={{
                    color: '#fff',
                    marginHorizontal: 15,
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                  {data.item._data.postedBy}
                </Text>
              </View>
              <View>
                <Image
                  source={require('../assets/dots.png')}
                  style={{height: 25, width: 25, tintColor: '#fff'}}
                />
              </View>
            </View>
            <View style={{height: '60%', width: '100%'}}>
              <Image
                source={{uri: data.item._data.downloadURL}}
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={styles.footer}>
              <View
                style={{
                  width: '40%',
                  height: '100%',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity onPress={() => setClick(!click)}>
                  <Image
                    source={require('../assets/heart.png')}
                    style={{
                      tintColor: click === true ? 'red' : '#fff',
                      height: 30,
                      width: 30,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    comment(data.index);
                    setShowModal(!showModal);
                  }}>
                  <Image
                    source={require('../assets/comment.png')}
                    style={{tintColor: '#fff', height: 25, width: 25}}
                  />
                </TouchableOpacity>
                <OpenModal />
                <TouchableOpacity>
                  <Image
                    source={require('../assets/share.png')}
                    style={{tintColor: '#fff', height: 25, width: 25}}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{marginRight: 10}}>
                <Image
                  source={require('../assets/bookmark.png')}
                  style={{
                    tintColor: '#fff',
                    height: 30,
                    width: 30,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginLeft: 20,
                flexDirection: 'row',
              }}>
              <Text style={{color: '#fff'}}>Liked by </Text>
              <Text style={{color: '#fff', fontWeight: '600'}}>sudhanshu </Text>
              <Text style={{color: '#fff'}}>and</Text>
              <Text style={{color: '#fff', fontWeight: '600'}}> others</Text>
            </View>
            <View
              style={{
                marginLeft: 20,
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{color: '#fff', fontWeight: '600'}}>
                {data.item._data.postedBy}
              </Text>
              <Text style={{color: '#fff', marginLeft: 10}}>
                {data.item._data.caption}
              </Text>
            </View>
            <View
              style={{
                marginLeft: 20,
                flexDirection: 'row',
                marginVertical: 5,
              }}>
              <Text style={{color: '#8c8c8c'}}>
                Posted At : {data.item._data.creation}
              </Text>
            </View>
          </View>
        )}
      />
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    height: 520,
  },
  header: {
    height: '10%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  footer: {
    height: '10%',
    width: '100%',
    backgroundColor: '#000',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
