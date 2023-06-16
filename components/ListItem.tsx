import { Text, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { theme } from '../theme';
import { useMemo } from 'react';

type Props = {
  label: string;
  detail?: React.ReactNode;
  onClick?: () => void;
  swipeToDelete?: boolean;
  onDelete?: () => void;
  isDestructive?: boolean;
};

export const ListItem = ({ label, detail, isDestructive, onClick, onDelete, swipeToDelete }: Props) => {
  const handleSwipeableOpen = (direction: "left" | "right") => {
    if (direction === "right") {
      onDelete();
    }
  }

  const item = useMemo(
    () => (
      <TouchableOpacity
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: detail ? 'space-between' : 'flex-start',
          alignItems: 'center',
          minHeight: 44,
          padding: 20,
          paddingHorizontal: 12,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          backgroundColor: theme.colors.card,
        }}
        onPress={onClick}
        disabled={!onClick}
      >
        <Text
          style={{
            fontSize: 18,
            color: isDestructive ? theme.colors.error : 'white',
          }}
        >
          {label}
        </Text>
        {detail}
      </TouchableOpacity>
    ),
    [label, detail]
  );
  if (swipeToDelete) {
    return (
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 100,
            }}
            onPress={onDelete}
          >
            <Text style={{ color: 'white' }}>Delete</Text>
          </TouchableOpacity>
        )}
        onSwipeableRightOpen={onDelete}
        onSwipeableOpen={direction => handleSwipeableOpen(direction)}
      >
        {item}
      </Swipeable>
    );
  }
  return item;

}

