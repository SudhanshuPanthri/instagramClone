import React, {useState} from 'react';
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
} from 'react-native';
import Story from '../components/Story';
import {users} from '../data/userData';
import Post from '../components/Post';

const HomeScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(false);

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
              bottom: '10%',
              height: 500,
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
                justifyContent: 'space-evenly',
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
                />
              </View>
              <TouchableOpacity onPress={() => setShowModal(!showModal)}>
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
              {image ? (
                <Image
                  source={require('../assets/user3.jpg')}
                  style={{height: '100%', width: '100%', borderRadius: 50}}
                />
              ) : (
                <Text style={{color: '#fff'}}>
                  Click an image or select one from photo album
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
                }}>
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
                }}>
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
            style={{width: '45%', height: '50%'}}
          />
        </View>
        <OpenModal />
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
          <TouchableOpacity>
            <Image
              source={require('../assets/dm.png')}
              style={{width: 30, height: 30, tintColor: '#fff'}}
            />
          </TouchableOpacity>
          <View style={styles.messageCounter}>
            <Text style={{color: '#fff', fontWeight: '600'}}>4</Text>
          </View>
        </View>
      </View>
      {/*stories section ye scroll hongi*/}
      <ScrollView>
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
          data={users}
          keyExtractor={item => item.id}
          renderItem={item => <Post user={item} />}
          // vertical={true}
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
