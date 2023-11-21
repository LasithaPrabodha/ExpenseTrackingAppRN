import React, {useState} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {ListItem} from '../components/ListItem';
import {NavigationProp, useTheme} from '@react-navigation/native';
import {Switch} from 'react-native';
import {Theme} from '../types/theme';

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
  const [isDark, setIsDark] = useState(false);
  const toggleSwitch = () => {
    setIsDark(previousState => {
      return !previousState;
    });
  };
  const {colors} = useTheme() as Theme;

  return (
    <View style={styles.container}>
      <ListItem
        label="Categories"
        detail={
          <Entypo
            name="chevron-thin-right"
            color="white"
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
            onValueChange={toggleSwitch}
            value={isDark}
          />
        }
      />
      <ListItem
        isDestructive
        label="Erase all data"
        onClick={() => onClickErase()}
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
