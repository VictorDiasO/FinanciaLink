import { Animated, Modal, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { FontAwesome, EvilIcons } from '@expo/vector-icons';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import { GestureHandlerRootView, Swipeable, RectButton }  from 'react-native-gesture-handler';

import { theme } from '../theme';
import { useCallback, useState } from 'react';
import { Category } from '../types/category';
import { CategoryRow } from '../components/CategoryRow';

export const Categories = () => {
  // TODO: Maybe on iOS we will need to add an KeyboardAvoidingView.
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(theme.colors.primary);
  const [newName, setNewName] = useState('');
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      color: theme.colors.primary,
      name: 'Groceries'
    },
    {
      id: '2',
      color: theme.colors.card,
      name: 'Clothes'
    }
  ]);

  const onSelectColor = (hex: string) => {
    setSelectedColor(hex);
  };

  const createCategory = () => {
    if (newName.length === 0) {
      return;
    }
    
    setCategories([...categories, {
      id: Math.random().toString(),
      color: selectedColor,
      name: newName,
    }]);
    setNewName('');
    setSelectedColor(theme.colors.primary);
  }

  const renderRightActions = (progress, dragX, id) => {
    // const trans = dragX.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [0, 0],
    // });
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [13, 0],
    });

    return (
      <View
        style={{
          backgroundColor: theme.colors.error,
          width: 75
        }}
      >
        <RectButton
          onPress={() => setCategories(categories.filter((category) => category.id !== id))}
          style={{
            flex: 1,
            // display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <EvilIcons name='trash' size={40} color='white' />
        </RectButton>
      </View>
      // <Animated.View
      //   style={{ flex: 1, transform: [{ translateX: trans }] }}
      // >
      //   <RectButton
      //     onPress={() => console.log("close it")}
      //     style={{
      //       backgroundColor: theme.colors.error,
      //       display: 'flex',
      //       alignItems: 'center',
      //       flex: 1,
      //       justifyContent: 'center',
      //     }}
      //   >
      //     <EvilIcons name='trash' size={40} color='white' />
      //   </RectButton>
      // </Animated.View>
    );
  };

  return (
    <>
      <View
        style={{
          margin: 16,
          flex: 1
        }}
      >
        <View
          style={{
            borderRadius: 11,
            overflow: 'hidden'
          }}
        >
          { categories.map(({ id, color, name }) => (
            <GestureHandlerRootView key={id}>
              <Swipeable
                key={id}
                onSwipeableOpen={() => {}}
                renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, id)}
              >
                <CategoryRow key={id} color={color} name={name} />
              </Swipeable>
            </GestureHandlerRootView>
          )) }
        </View>
        <View style={{ flex: 1 }} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 12,
            paddingVertical: 8,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => setShowColorPicker(!showColorPicker)}>
            <View
              style={{
                backgroundColor: selectedColor,
                width: 32,
                height: 32,
                borderRadius: 16,
                borderWidth: 3,
                borderColor: 'white'
              }}
            >
            </View>
          </TouchableOpacity>
          <TextInput
            placeholder='Category name'
            onChange={(event) => setNewName(event.nativeEvent.text)}
            value={newName}
            placeholderTextColor={theme.colors.border}
            style={{
              color: 'white',
              borderColor: theme.colors.border,
              borderWidth: 1,
              flex: 1,
              borderRadius: 8,
              paddingLeft: 8,
              padding: 10,
              marginLeft: 5
            }}
          />
          <TouchableOpacity
            style={{
              padding: 12,
            }}
            onPress={createCategory}
          >
            <FontAwesome name='send' size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showColorPicker}
        animationType='fade'
        transparent
      >
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          <View style={{
            backgroundColor: theme.colors.card,
            width: '90%',
            borderRadius: 12
          }}>
            <ColorPicker
              hideSliders
              color={selectedColor}
              onColorChange={color => onSelectColor(fromHsv(color))}
              onColorSelected={color => onSelectColor(color)}
              onOldColorSelected={color => onSelectColor(color)}
              // style={{ flex: 1 }}
              style={{ height: 300 }}
            />
            <TouchableOpacity
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignSelf: 'center',
                marginBottom: 20,
                borderRadius: 10,
                borderWidth: 2,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderColor: 'white',
                marginTop: 8
              }}
              onPress={() => setShowColorPicker(false)}
            >
              <Text style={{ color: 'white' }}>SELECT IT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
