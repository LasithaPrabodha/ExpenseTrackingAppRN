import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TabBarIcon} from '../components/TabBarIcon';
import {theme} from '../theme';
import React from 'react';
import {ExpensesScreen} from './ExpensesScreen';
import {AddExpenseScreen} from './AddExpenseScreen';
import {SettingsScreen} from './SettingsScreen';
import {StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

export const HomeScreen = (): JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: styles.tabBar,
        tabBarIcon: props => {
          switch (route.name) {
            case 'Expenses':
              return <TabBarIcon {...props} type="expenses" />;
            case 'Add':
              return <TabBarIcon {...props} type="add" />;
            case 'Settings':
              return <TabBarIcon {...props} type="settings" />;
          }
        },
      })}>
      <Tab.Screen name="Expenses" component={ExpensesScreen} />
      <Tab.Screen name="Add" component={AddExpenseScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.card,
  },
});
