import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {View, Text, Image} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          borderTopColor: '#000',
          backgroundColor: '#000',
          height: 80,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/home.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#fff' : '#fff',
                }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component=""
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/search.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#fff' : '#fff',
                }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ReelScreen"
        component=""
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/reels.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#fff' : '#fff',
                }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="LikeScreen"
        component=""
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/heart.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#fff' : '#fff',
                }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AccountScreen"
        component=""
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/user4.jpg')}
                style={{
                  width: 30,
                  borderRadius: 50,
                  height: 30,
                  borderWidth: 3,
                  borderColor: '#fff',
                  // tintColor: focused && '#fff',
                }}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
