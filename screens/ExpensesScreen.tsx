import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {getPlainRecurrence} from '../utils/recurrence';
import {theme} from '../theme';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {Recurrence} from '../types/recurrence';
import {ExpensesList} from '../components/ExpensesList';
import {getGroupedExpenses} from '../utils/expenses';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {Expense} from '../models/expense';

export const ExpensesScreen = (): JSX.Element => {
  const expenses: Expense[] = useSelector(
    (state: RootState) => state.expenses.expenses,
  );
  const [recurrence, setRecurrence] = useState(Recurrence.Weekly);
  const recurrenceSheetRef = useRef<BottomSheet>(null);

  const groupedExpenses = getGroupedExpenses(expenses, recurrence);
  const total = groupedExpenses.reduce((sum, group) => (sum += group.total), 0);

  const changeRecurrence = (newRecurrence: Recurrence) => {
    setRecurrence(newRecurrence);
    recurrenceSheetRef.current?.close();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.totalWrapper}>
          <Text style={styles.totalLabel}>Total for:</Text>
          <TouchableOpacity
            style={styles.groupByFilter}
            onPress={() => recurrenceSheetRef.current?.expand()}>
            <Text style={styles.groupByLabel}>
              This {getPlainRecurrence(recurrence)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.amountWrapper}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.amount}>{total}</Text>
        </View>
        <ExpensesList groups={groupedExpenses} />
      </View>
      <BottomSheet
        ref={recurrenceSheetRef}
        index={-1}
        handleStyle={styles.bottomSheetHandleStyle}
        handleIndicatorStyle={styles.handle}
        enablePanDownToClose
        snapPoints={['25%', '50%']}>
        <BottomSheetFlatList
          style={{backgroundColor: theme.colors.card}}
          data={[
            Recurrence.Daily,
            Recurrence.Weekly,
            Recurrence.Monthly,
            Recurrence.Yearly,
          ]}
          renderItem={({item}) => (
            <TouchableHighlight
              style={styles.groupByItem}
              onPress={() => changeRecurrence(item)}>
              <Text
                style={[
                  styles.groupBy,
                  {
                    color: recurrence === item ? theme.colors.primary : 'white',
                  },
                ]}>
                This {getPlainRecurrence(item)}
              </Text>
            </TouchableHighlight>
          )}
        />
      </BottomSheet>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
    paddingHorizontal: 16,
    width: '100%',
    paddingTop: 16,
  },
  totalWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  totalLabel: {color: theme.colors.textPrimary, fontSize: 17},
  amountWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  currency: {
    color: theme.colors.textSecondary,
    fontSize: 17,
    marginTop: 2,
  },
  amount: {
    color: theme.colors.textPrimary,
    fontSize: 40,
    fontWeight: '600',
    marginLeft: 2,
  },
  bottomSheetHandleStyle: {
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  handle: {backgroundColor: '#FFFFFF55'},
  groupBy: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  groupByItem: {paddingHorizontal: 18, paddingVertical: 12},
  groupByLabel: {color: theme.colors.primary, fontSize: 17},
  groupByFilter: {marginLeft: 16},
});
