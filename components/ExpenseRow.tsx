import React, { useState } from 'react';
import {View, Text, StyleSheet, Pressable, Alert, Animated, Touchable} from 'react-native';

import {Expense} from '../models/expense';
import {useTheme} from '@react-navigation/native';
import {Colors, Theme} from '../types/theme';
import * as database from '../database'
import { removeExpense } from '../redux/expensesSlice';
import { useDispatch } from 'react-redux';
import { Swipeable } from 'react-native-gesture-handler';
import { TouchableOpacity } from '@gorhom/bottom-sheet';


type Props = {
  expense: Expense;
};

export const ExpenseRow = ({expense}: Props) => {
  const {colors} = useTheme() as Theme;
  const styles = createStyles(colors);
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false);

  const handleRemovePress = () => {
    Alert.alert(
        'Remove Expense', 'Confirm you want to delete this expense. This action cannot be undone!', [
            {
                text: 'Confirm', onPress: () => { dispatch(removeExpense(expense.id)); setShowModal(false); database.remove(expense.id); console.log(expense.id)}
            },
            {
                text: 'Cancel'
            }
        ]
    )
  }

const leftSwipe = () => {
  return (
    <TouchableOpacity onPress={() =>handleRemovePress()} style={styles.deleteBox}>
      <View >
        <Animated.Text style={styles.animatedText}>Delete</Animated.Text>
      </View>
    </TouchableOpacity>
    
  )
}

  return (
    <Swipeable renderLeftActions={leftSwipe}>
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
    </Swipeable>
    
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
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
      color: colors.textPrimary,
    },
    amount: {
      fontSize: 17,
      fontWeight: '600',
      color: colors.textPrimary,
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
    date: {fontSize: 17, color: colors.textSecondary
    },
    deleteBox: {
      backgroundColor: 'red',
      justifyContent: 'center',
      width: 70,
      borderRadius: 5,
      alignItems: 'center',
      paddingVertical: 8,
      marginRight: 10
    },
    animatedText:{
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold',
      textAlign: 'center'
    }
  });
