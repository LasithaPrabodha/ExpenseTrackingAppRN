import React, { useEffect } from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import * as database from '../database'
import {ExpensesGroup} from '../types/expenses-group';
import {ExpenseRow} from './ExpenseRow';
import {Colors, Theme} from '../types/theme';
import {useTheme} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setExpense } from '../redux/expensesSlice';

type Props = {
  groups: ExpensesGroup[];
};

export const ExpensesList = ({groups}: Props) => {
  const {colors} = useTheme() as Theme;
  const styles = createStyles(colors);

  const dispatch = useDispatch()

  useEffect(()=>{
    (async ()=>{
      const data = await database.load()
      console.log(data)

      dispatch(setExpense(data))
    })()
    }, [])

  return (
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
};
const createStyles = (colors: Colors) =>
  StyleSheet.create({
    list: {height: '100%'},
    itemWrapper: {display: 'flex', flexDirection: 'column', marginBottom: 24},
    itemDayText: {
      marginBottom: 4,
      color: colors.textSecondary,
      fontSize: 17,
      fontWeight: '600',
    },
    expenseWrapper: {
      borderBottomColor: colors.border,
      borderBottomWidth: 2,
      marginBottom: 8,
    },
    border: {
      borderBottomColor: colors.border,
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
      color: colors.textSecondary,
    },
    total: {
      fontSize: 17,
      color: colors.textSecondary,
      fontWeight: '600',
    },
  });
