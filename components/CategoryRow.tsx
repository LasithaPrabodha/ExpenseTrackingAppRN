import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {Colors, Theme} from '../types/theme';

export const CategoryRow = ({color, name}: {color: string; name: string}) => {
  const {colors} = useTheme() as Theme;
  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <View style={[styles.color, {backgroundColor: color}]} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'flex-start',
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    color: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 2,
      borderColor: 'white',
    },
    name: {color: 'white', fontSize: 16, marginLeft: 8},
  });
