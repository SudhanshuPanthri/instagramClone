import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import {firebase} from '../firebase/FirebaseConfig';

const SearchScreen = () => {
  const [users, setUsers] = useState('');
  const [loading, setLoading] = useState(false);
  //fetching user from firebase
  const fetchUsers = async search => {
    const data = await firebase
      .firestore()
      .collection('UserData')
      .where('name', '>=', search)
      .get()
      .then(snapshot => {
        setUsers(snapshot.docs);
      });
    if (data != null) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  return (
    <View style={styles.parent}>
      {console.log(users)}
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <View
          style={{
            backgroundColor: '#696969',
            width: '80%',
            justifyContent: 'center',
            borderRadius: 12,
          }}>
          <TextInput
            placeholder="Search for users"
            placeholderTextColor="#fff"
            style={{
              marginLeft: 20,
              color: 'white',
              fontSize: 16,
              fontWeight: '500',
            }}
            onChangeText={search => fetchUsers(search)}
          />
        </View>
      </View>
      {users !== '' ? (
        <View>
          <FlatList
            data={users}
            numColumns={1}
            vertical={true}
            renderItem={user => (
              <View>
                {console.log(user._data.name)}
                <Text style={{color: '#fff'}}>{user._data.name}</Text>
              </View>
            )}
          />
        </View>
      ) : (
        <View>
          <Text style={{color: '#fff'}}>Loading</Text>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#000',
  },
});
