import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {theme} from '../theme';

import {ExpensesGroup} from '../types/expenses-group';
import {ExpenseRow} from './ExpenseRow';

type Props = {
  groups: ExpensesGroup[];
};

export const ExpensesList = ({groups}: Props) => (
  <FlatList
    style={styles.list}
    data={groups}
    keyExtractor={item => item.day}
    renderItem={({item: {day, expenses, total}}) => (
      <View style={styles.itemWrapper}>
        <Text style={styles.itemDayText}>{day}</Text>
        <View style={styles.expenseWrapper} />
        {expenses.map(expense => (
          <ExpenseRow key={expense.id} expense={expense} />
        ))}
        <View style={styles.border} />
        <View style={styles.totalWrapper}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.total}>USD {total}</Text>
        </View>
      </View>
    )}
  />
);
const styles = StyleSheet.create({
  list: {height: '100%'},
  itemWrapper: {display: 'flex', flexDirection: 'column', marginBottom: 24},
  itemDayText: {
    marginBottom: 4,
    color: theme.colors.textSecondary,
    fontSize: 17,
    fontWeight: '600',
  },
  expenseWrapper: {
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 2,
    marginBottom: 8,
  },
  border: {
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 2,
    marginBottom: 4,
  },
  totalWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 17,
    color: theme.colors.textSecondary,
  },
  total: {
    fontSize: 17,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
});
