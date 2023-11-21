import React, {useMemo, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  InputAccessoryView,
  Keyboard,
  Platform,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {v4 as uuid} from 'uuid';

import {ListItem} from '../components/ListItem';
import {Recurrence} from '../types/recurrence';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Category} from '../models/category';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {addExpense} from '../redux/expensesSlice';
import {Expense} from '../models/expense';
import {Colors, Theme} from '../types/theme';
import {useTheme} from '@react-navigation/native';

export const AddExpenseScreen = (): JSX.Element => {
  const categories: Category[] = useSelector(
    (state: RootState) => state.categories.categories,
  );
  const dispatch = useDispatch();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const [sheetView, setSheetView] = useState<'recurrence' | 'category'>(
    'recurrence',
  );
  const [amount, setAmount] = useState('');
  const [recurrence, setRecurrence] = useState(Recurrence.None);
  const [date, setDate] = useState<Date>(new Date());
  const [note, setNote] = useState('');
  const [category, setCategory] = useState<Category>(categories[0]);

  const selectRecurrence = (selectedRecurrence: string) => {
    setRecurrence(selectedRecurrence as Recurrence);
    sheetRef.current?.close();
  };

  const selectCategory = (selectedCategory: Category) => {
    setCategory(selectedCategory);
    sheetRef.current?.close();
  };

  const clearForm = () => {
    setAmount('');
    setRecurrence(Recurrence.None);
    setDate(new Date());
    setNote('');
    setCategory(categories[0]);
  };

  const submitExpense = () => {
    // add

    if (!amount || !note) {
      return;
    }

    const expense = new Expense({
      id: uuid(),
      amount: parseFloat(amount),
      recurrence,
      date,
      note,
      category,
    });

    dispatch(addExpense(expense));
    clearForm();
  };

  const {colors} = useTheme() as Theme;
  const styles = createStyles(colors);
  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={112}
        style={styles.keyboardAvoidView}>
        <View style={styles.newExpenseForm}>
          <ListItem
            label="Amount"
            detail={
              <TextInput
                placeholder="Amount"
                onChange={event => setAmount(event.nativeEvent.text)}
                value={amount}
                textAlign="right"
                keyboardType="numeric"
                inputAccessoryViewID="dismissKeyboard"
                style={styles.amountText}
              />
            }
          />
          <ListItem
            label="Recurrence"
            detail={
              <TouchableOpacity
                style={styles.recurrenceBtn}
                onPress={() => {
                  setSheetView('recurrence');
                  sheetRef.current?.snapToIndex(1);
                }}>
                <Text style={styles.recurrence}>{recurrence}</Text>
              </TouchableOpacity>
            }
          />
          <ListItem
            label="Date"
            detail={
              Platform.OS === 'ios' && (
                <DateTimePicker
                  value={new Date(date)}
                  mode={'date'}
                  is24Hour={true}
                  themeVariant="dark"
                  maximumDate={new Date()}
                  minimumDate={
                    new Date(
                      new Date().getFullYear() - 1,
                      new Date().getMonth(),
                      new Date().getDate(),
                    )
                  }
                  onChange={(event, newDate) => {
                    newDate && setDate(newDate);
                  }}
                />
              )
            }
          />
          <ListItem
            label="Note"
            detail={
              <TextInput
                placeholder="Note"
                onChange={event => setNote(event.nativeEvent.text)}
                value={note}
                textAlign="right"
                inputAccessoryViewID="dismissKeyboard"
                style={styles.noteTextInput}
              />
            }
          />
          <ListItem
            label="Category"
            detail={
              <TouchableOpacity
                style={styles.recurrenceBtn}
                onPress={() => {
                  setSheetView('category');
                  sheetRef.current?.snapToIndex(1);
                }}>
                <Text style={[styles.categoryText, {color: category?.color}]}>
                  {category?.name}
                </Text>
              </TouchableOpacity>
            }
          />
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={submitExpense}>
          <Text style={styles.submitBtnText}>Submit expense</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        handleStyle={styles.bottomSheetHandle}
        handleIndicatorStyle={styles.handle}
        enablePanDownToClose
        snapPoints={snapPoints}>
        {sheetView === 'recurrence' && (
          <BottomSheetFlatList
            data={Object.keys(Recurrence)}
            keyExtractor={i => i}
            renderItem={item => (
              <TouchableHighlight
                style={styles.bottomSheetBtn}
                onPress={() => selectRecurrence(item.item)}>
                <Text style={styles.bottomSheetItem}>{item.item}</Text>
              </TouchableHighlight>
            )}
            style={{backgroundColor: colors.card}}
          />
        )}
        {sheetView === 'category' && (
          <BottomSheetFlatList
            data={categories}
            keyExtractor={({id}) => id}
            renderItem={({item}) => (
              <TouchableHighlight
                style={styles.bottomSheetBtn}
                onPress={() => selectCategory(item)}>
                <View style={styles.categoryColorWrapper}>
                  <View
                    style={[
                      styles.categoryColor,
                      {backgroundColor: item.color},
                    ]}
                  />
                  <Text style={styles.category}>{item.name}</Text>
                </View>
              </TouchableHighlight>
            )}
            style={{backgroundColor: colors.card}}
          />
        )}
      </BottomSheet>
      <InputAccessoryView nativeID="dismissKeyboard">
        <View style={styles.dismissWrapper}>
          <TouchableOpacity onPress={() => Keyboard.dismiss()}>
            <MaterialIcons
              name="keyboard-hide"
              size={28}
              style={{color: colors.primary}}
            />
          </TouchableOpacity>
        </View>
      </InputAccessoryView>
    </>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    keyboardAvoidView: {margin: 16, flex: 1, alignItems: 'center'},
    newExpenseForm: {
      borderRadius: 11,
      overflow: 'hidden',
      width: '100%',
    },
    amountText: {
      height: 40,
      color: 'white',
      flex: 1,
      borderRadius: 8,
      paddingLeft: 8,
      fontSize: 16,
    },
    recurrenceBtn: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    recurrence: {
      color: colors.primary,
      textTransform: 'capitalize',
      fontSize: 16,
    },
    noteTextInput: {
      height: 40,
      color: 'white',
      flex: 1,
      borderRadius: 8,
      paddingLeft: 8,
      fontSize: 16,
    },
    submitBtn: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 13,
      borderRadius: 10,
      marginTop: 32,
    },
    submitBtnText: {color: 'white', fontWeight: '600', fontSize: 17},
    bottomSheetHandle: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    handle: {backgroundColor: '#FFFFFF55'},
    bottomSheetBtn: {paddingHorizontal: 18, paddingVertical: 12},
    bottomSheetItem: {color: 'white', fontSize: 18},
    categoryColorWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    categoryColor: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    category: {color: 'white', fontSize: 18, marginLeft: 12},
    dismissWrapper: {
      height: 44,
      display: 'flex',
      justifyContent: 'center',
      paddingHorizontal: 16,
      alignItems: 'flex-end',
      backgroundColor: colors.card,
      borderTopColor: colors.border,
      borderTopWidth: 1,
    },
    categoryText: {
      textTransform: 'capitalize',
      fontSize: 16,
    },
  });
