import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '../theme';

import {Expense} from '../models/expense';

type Props = {
  expense: Expense;
};

export const ExpenseRow = ({expense}: Props) => (
  <View style={styles.container}>
    <View style={styles.itemWrapper}>
      <Text style={styles.item}>{expense.note}</Text>
      <Text style={styles.amount}>USD {expense.amount}</Text>
    </View>
    <View style={styles.categoryWrapper}>
      <View
        style={[
          styles.category,
          {
            backgroundColor: `${expense.category.color}66`,
          },
        ]}>
        <Text style={[styles.categoryText, {color: expense.category.color}]}>
          {expense.category.name}
        </Text>
      </View>
      <Text style={styles.date}>
        {`${expense.date.getHours()}`.padStart(2, '0')}:
        {`${expense.date.getMinutes()}`.padStart(2, '0')}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {display: 'flex', flexDirection: 'column', marginBottom: 12},
  itemWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  item: {
    fontSize: 17,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  amount: {
    fontSize: 17,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  categoryWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  categoryText: {fontSize: 13},
  date: {fontSize: 17, color: theme.colors.textSecondary},
});
