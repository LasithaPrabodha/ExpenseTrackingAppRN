import React from 'react';
import {View, Text} from 'react-native';
import {theme} from '../theme';
import {StyleSheet} from 'react-native';

export const CategoryRow = ({color, name}: {color: string; name: string}) => (
  <View style={styles.container}>
    <View style={[styles.color, {backgroundColor: color}]} />
    <Text style={styles.name}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.card,
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
