import React from 'react';
import {HomeScreen} from './screens/HomeScreen';
import {CategoriesScreen} from './screens/CategoriesScreen';
import {LoginScreen} from './screens/LoginScreen';
import {RegisterScreen} from './screens/RegisterScreen';
import {StatusBar} from 'react-native';
import lightTheme from './theme/light';
import darkTheme from './theme/dark';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useAuth from './lib/AuthProvider';

const Stack = createNativeStackNavigator();
interface Props {
  theme?: string;
}

export default function Navigation({theme}: Props) {
  const user = useAuth();
  return (
    <NavigationContainer theme={theme === 'light' ? lightTheme : darkTheme}>
      <StatusBar barStyle={'light-content'} />
      <Stack.Navigator>
        {user == null ? (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="LoginScreen"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{headerBackTitleVisible: false}}
              name="RegisterScreen"
              component={RegisterScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="HomeScreen"
              component={HomeScreen}
            />
            <Stack.Screen
              name="CategoriesScreen"
              component={CategoriesScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
