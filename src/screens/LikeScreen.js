import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LikeScreen = () => {
  return (
    <View style={styles.parent}>
      <Text style={{color: '#fff'}}>Feature yet to come :D</Text>
    </View>
  );
};

export default LikeScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
