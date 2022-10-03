import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import Story from '../components/Story';
import {users} from '../data/userData';
import Post from '../components/Post';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.parent}>
      {/*header section*/}
      <View style={styles.header}>
        <View
          style={{
            height: '100%',
            width: '65%',
            justifyContent: 'center',
            marginLeft: 10,
          }}>
          <Image
            source={require('../assets/logo.png')}
            style={{width: '50%', height: '50%'}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: '100%',
            width: '35%',
          }}>
          <Image
            source={require('../assets/addpost.png')}
            style={{width: 30, height: 30, tintColor: '#fff'}}
          />
          <Image
            source={require('../assets/dm.png')}
            style={{width: 30, height: 30, tintColor: '#fff'}}
          />
          <View style={styles.messageCounter}>
            <Text style={{color: '#fff', fontWeight: '600'}}>4</Text>
          </View>
        </View>
      </View>
      {/*stories section ye scroll hongi*/}
      <ScrollView style={{marginBottom: 100}}>
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
