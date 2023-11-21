import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {StatusBar} from 'react-native';
import {theme} from './theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {HomeScreen} from './screens/HomeScreen';
import {CategoriesScreen} from './screens/CategoriesScreen';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {LoginScreen} from './screens/LoginScreen';
import {RegisterScreen} from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <NavigationContainer theme={theme}>
          <StatusBar barStyle={'light-content'} />
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name="LoginScreen"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{
                headerBackTitleVisible: false,
                headerStyle: {
                  backgroundColor: theme.colors.background,
                },
              }}
              name="RegisterScreen"
              component={RegisterScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="HomeScreen"
              component={HomeScreen}
            />
            <Stack.Screen
              name="CategoriesScreen"
              component={CategoriesScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
