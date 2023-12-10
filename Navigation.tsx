import React, {useCallback} from 'react';
import {HomeScreen} from './screens/HomeScreen';
import {CategoriesScreen} from './screens/CategoriesScreen';
import {LoginScreen} from './screens/LoginScreen';
import {RegisterScreen} from './screens/RegisterScreen';
import {StatusBar, View} from 'react-native';
import lightTheme from './theme/light';
import darkTheme from './theme/dark';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useAuth from './lib/AuthProvider';

import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();
interface Props {
  theme?: string;
}

export default function Navigation({theme}: Props) {
  const {user, initializing} = useAuth();

  const onLayoutRootView = useCallback(async () => {
    if (initializing === false) {
      await SplashScreen.hideAsync();
    }
  }, [initializing]);

  if (initializing) {
    return <></>;
  }
  return (
    <View style={{flex: 1}} onLayout={onLayoutRootView}>
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
    </View>
  );
}
