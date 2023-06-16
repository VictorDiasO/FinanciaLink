import { View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

import { ListItem } from "../components/ListItem";

export const Settings = ({ navigation }) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        margin: 16,
        borderRadius: 11,
        overflow: 'hidden'
      }}
    >
      <ListItem
        label="Categories"
        detail={<Entypo name="chevron-thin-right" color='white' style={{ opacity: 0.3  }} size={16} />}
        onClick={() => {
          navigation.navigate('Categories');
        }}
      />

      {/* <ListItem
        label="Report a bug"
        detail={<Entypo name="chevron-thin-right" color='white' size={16} />}
        onClick={() => {}}
      /> */}

      <ListItem
        label="Erase all data"
        isDestructive
        onClick={() => {}}
      />
    </View>
  );
}
