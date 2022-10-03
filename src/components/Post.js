import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const Post = ({user}) => {
  const [click, setClick] = useState(false);
  return (
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
            source={user.item.image}
            style={{width: 40, height: 40, borderRadius: 50}}
          />
          <Text
            style={{
              color: '#fff',
              marginHorizontal: 15,
              fontSize: 16,
              fontWeight: '600',
            }}>
            {user.item.name}
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
          source={user.item.image}
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
          <TouchableOpacity>
            <Image
              source={require('../assets/comment.png')}
              style={{tintColor: '#fff', height: 25, width: 25}}
            />
          </TouchableOpacity>
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
        <Text style={{color: '#fff', fontWeight: '600'}}> sudhanshu </Text>
        <Text style={{color: '#fff'}}>and</Text>
        <Text style={{color: '#fff', fontWeight: '600'}}> others</Text>
      </View>
      <View
        style={{
          marginLeft: 20,
          flexDirection: 'row',
          marginTop: 5,
        }}>
        <Text style={{color: '#fff', fontWeight: '600'}}>{user.item.name}</Text>
        <Text style={{color: '#fff', marginLeft: 10}}>{user.item.caption}</Text>
      </View>
      <View
        style={{
          marginLeft: 20,
          flexDirection: 'row',
          marginVertical: 5,
        }}>
        <Text style={{color: '#8c8c8c'}}>{user.item.postedAt}</Text>
      </View>
    </View>
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
