import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const Story = ({user}) => {
  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <Image
          source={user.item.image}
          style={{width: '100%', height: '100%', borderRadius: 50}}
        />
      </TouchableOpacity>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#fff'}}>{user.item.name}</Text>
      </View>
    </View>
  );
};
export default Story;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderRadius: 50,
    borderColor: '#ae22e0',
    height: 70,
    width: 70,
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
