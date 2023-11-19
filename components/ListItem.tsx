import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {theme} from '../theme';

type Props = {
  label: string;
  detail?: React.ReactNode;
  onClick?: () => void;
  swipeToDelete?: boolean;
  onDelete?: (direction: string) => void;
  isDestructive?: boolean;
};

export const ListItem = ({
  label,
  detail,
  onClick,
  swipeToDelete,
  onDelete,
  isDestructive,
}: Props) => {
  const item = useMemo(
    () => (
      <TouchableOpacity
        style={[
          styles.itemWrapper,
          {justifyContent: !!detail ? 'space-between' : 'flex-start'},
        ]}
        onPress={onClick}
        disabled={!onClick}>
        <Text
          style={[
            styles.itemText,
            {color: isDestructive ? theme.colors.error : 'white'},
          ]}>
          {label}
        </Text>
        {detail}
      </TouchableOpacity>
    ),
    [label, detail, onClick, isDestructive],
  );
  if (swipeToDelete) {
    return (
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete && onDelete('right')}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        )}
        onSwipeableOpen={onDelete}>
        {item}
      </Swipeable>
    );
  }
  return item;
};

const styles = StyleSheet.create({
  itemWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',

    alignItems: 'center',
    minHeight: 44,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  itemText: {
    fontSize: 16,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  deleteText: {color: 'white'},
});
