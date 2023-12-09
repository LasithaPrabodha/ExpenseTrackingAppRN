import React from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import {ListItem} from '../components/ListItem';
import {NavigationProp, useTheme} from '@react-navigation/native';
import {Switch} from 'react-native';
import {Theme} from '../types/theme';
import { ThemeContext } from '../theme/context';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

export const SettingsScreen = ({navigation}: RouterProps): JSX.Element => {
  const onClickErase = () => {
    Alert.alert(
      'Are you sure?',
      'This action cannot be undone',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Erase data',
          style: 'destructive',
          onPress: () => {},
        },
      ],
      {
        userInterfaceStyle: 'dark',
      },
    );
  };
  const {colors} = useTheme() as Theme;

  const {setTheme, theme} = React.useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <ListItem
        label="Categories"
        detail={
          <Entypo
            name="chevron-thin-right"
            color={colors.text}
            style={{opacity: 0.3}}
            size={20}
          />
        }
        onClick={() => {
          navigation.navigate('CategoriesScreen');
        }}
      />
      <ListItem
        label="Dark Appearance"
        detail={
          <Switch
            trackColor={{
              false: colors.textSecondary,
              true: colors.primary,
            }}
            onValueChange={isDark => setTheme(isDark ? 'dark' : 'light')}
            value={theme === 'dark'}
          />
        }
      />
      <ListItem
        isDestructive
        label="Erase all data"
        onClick={() => onClickErase()}
      />
      <ListItem
        isDestructive
        label="Log Out"
        onClick={() => navigation.navigate('LoginScreen')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 11,
    overflow: 'hidden',
  },
});
