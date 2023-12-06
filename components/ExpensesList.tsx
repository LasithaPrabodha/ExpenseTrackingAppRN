import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import * as database from '../database'
import {ExpensesGroup} from '../types/expenses-group';
import {ExpenseRow} from './ExpenseRow';
import {Colors, Theme} from '../types/theme';
import {useTheme} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setExpense } from '../redux/expensesSlice';
import { RootState } from '../redux/store';

type Props = {
  groups: ExpensesGroup[];
};

export const ExpensesList = ({groups}: Props) => {
  const {colors} = useTheme() as Theme;
  const styles = createStyles(colors);
  const dispatch = useDispatch()
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async ()=>{
      try{
        setLoading(true)
        const data = (await database.load()).map(item=> ({...item, date: new Date(item.date)}))

        dispatch(setExpense(data));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching expenses:', err)
      }
    })()
    }, [])

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="large"/>
        <Text style={styles.loadingText}>Saving data!</Text>
        <Text style={styles.loadingText}>Please wait...</Text>
      </View>
      );
    }

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
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 20,
      marginTop:10
    }
  });
