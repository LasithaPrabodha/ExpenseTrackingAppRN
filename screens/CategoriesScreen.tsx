import React, {useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ColorPicker, fromHsv} from 'react-native-color-picker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {v4 as uuid} from 'uuid';

import {RectButton, TouchableOpacity} from 'react-native-gesture-handler';
import {CategoryRow} from '../components/CategoryRow';
import {Category} from '../models/category';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {addCategory} from '../redux/categoriesSlice';
import {Colors, Theme} from '../types/theme';
import {useTheme} from '@react-navigation/native';

export const CategoriesScreen = (): JSX.Element => {
  const categories: Category[] = useSelector(
    (state: RootState) => state.categories.categories,
  );
  const dispatch = useDispatch();
  const {colors} = useTheme() as Theme;
  const styles = createStyles(colors);

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors.primary);
  const [newName, setNewName] = useState('');

  const onSelectColor = (hex: string) => {
    setSelectedColor(hex);
  };

  const createCategory = () => {
    if (newName.length === 0) {
      return;
    }

    const category = new Category({
      id: uuid(),
      name: newName,
      color: selectedColor,
    });
    dispatch(addCategory(category));
    setNewName('');
    setSelectedColor(colors.primary);
  };

  const deleteCategory = () => {};

  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={112}
        style={styles.keyAvoidView}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.categoriesWrapper}>
            {categories.map(({id, color, name}) => (
              <Swipeable
                key={id}
                renderRightActions={() => {
                  return (
                    <View style={styles.categoryItemWrapper}>
                      <RectButton
                        style={styles.categoryButton}
                        onPress={() => deleteCategory()}>
                        <EvilIcons name="trash" size={40} color={colors.text} />
                      </RectButton>
                    </View>
                  );
                }}>
                <CategoryRow color={color} name={name} />
              </Swipeable>
            ))}
          </View>
        </ScrollView>
        <View style={styles.newCategoryWrapper}>
          <TouchableOpacity
            onPress={() => setShowColorPicker(!showColorPicker)}>
            <View
              style={[
                styles.categoryColor,
                {
                  backgroundColor: selectedColor,
                },
              ]}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Category name"
            placeholderTextColor={colors.textSecondary}
            onChange={event => setNewName(event.nativeEvent.text)}
            value={newName}
            style={styles.newCategoryInput}
          />
          <TouchableOpacity onPress={createCategory} style={styles.sendButton}>
            <FontAwesome name="plus" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal
        transparent
        visible={showColorPicker}
        animationType="fade"
        onRequestClose={() => setShowColorPicker(false)}>
        <View style={styles.colorPickerModal}>
          <View style={styles.colorPickerWrapper}>
            <ColorPicker
              hideSliders
              color={selectedColor}
              onColorChange={color => onSelectColor(fromHsv(color))}
              style={styles.colorPicker}
            />
            <Button onPress={() => setShowColorPicker(false)} title="Select" />
          </View>
        </View>
      </Modal>
    </>
  );
};
const createStyles = (colors: Colors) =>
  StyleSheet.create({
    keyAvoidView: {margin: 16, flex: 1},
    scrollView: {flex: 1},
    categoriesWrapper: {
      borderRadius: 11,
      overflow: 'hidden',
    },
    categoryItemWrapper: {
      backgroundColor: colors.error,
      width: 75,
    },
    categoryButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    newCategoryWrapper: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 8,
    },
    categoryColor: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 3,
      borderColor: colors.border,
    },
    newCategoryInput: {
      color: colors.text,
      height: 40,
      borderColor: colors.border,
      borderWidth: 1,
      flex: 1,
      borderRadius: 8,
      paddingLeft: 8,
      marginLeft: 16,
    },
    colorPickerModal: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    colorPickerWrapper: {
      padding: 24,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.card,
      overflow: 'hidden',
      borderRadius: 12,
    },
    colorPicker: {width: '100%', height: 300},
    sendButton: {padding: 12},
  });
