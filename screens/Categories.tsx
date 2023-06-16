import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ColorPicker, fromHsv, toHsv } from 'react-native-color-picker';

import { theme } from '../theme';
import { useState } from 'react';
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
            <CategoryRow key={id} color={color} name={name} />
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
          {/* <TouchableOpacity
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10
            }}
          >
            <Text style={{ color: 'white' }}>COLOR</Text>
          </TouchableOpacity> */}
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
