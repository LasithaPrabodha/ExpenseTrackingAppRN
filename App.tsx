import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React, {createContext, useState} from 'react';

import {StatusBar} from 'react-native';
import lightTheme from './theme/light';
import darkTheme from './theme/dark';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {HomeScreen} from './screens/HomeScreen';
import {CategoriesScreen} from './screens/CategoriesScreen';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {LoginScreen} from './screens/LoginScreen';
import {RegisterScreen} from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();
export const ThemeContext = createContext<{
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}>({theme: 'light', setTheme: () => {}});

export default function App(): JSX.Element {
  const [theme, setTheme] = useState('light');
  const themeData = {theme, setTheme};
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <ThemeContext.Provider value={themeData}>
          <NavigationContainer
            theme={theme === 'light' ? lightTheme : darkTheme}>
            <StatusBar barStyle={'light-content'} />
            <Stack.Navigator>
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
        </ThemeContext.Provider>
      </Provider>
    </GestureHandlerRootView>
  );
}
