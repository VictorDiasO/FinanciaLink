import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { theme } from "../theme";
import { TabBarIcon } from "../components/TabBarIcon";
import { Expenses, Reports, Add, Settings } from '../screens';

const Tab = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTitleStyle: {
          fontSize: 24
        }
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: (props) => TabBarIcon({ ...props, type: "expenses" })
        }}
        name='Expenses'
        component={Expenses}
      /> 
      <Tab.Screen
        options={{
          tabBarIcon: (props) => TabBarIcon({ ...props, type: "reports" })
        }}
        name='Reports'
        component={Reports}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => TabBarIcon({ ...props, type: "add" })
        }}
        name='Add'
        component={Add}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => TabBarIcon({ ...props, type: "settings" })
        }}
        name='Settings'
        component={Settings}
      />
    </Tab.Navigator>
  );
}
