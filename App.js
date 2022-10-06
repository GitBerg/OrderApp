import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Tables from "./src/pages/Tables";
import Order from "./src/pages/Order";
import Menu from "./src/pages/Menu";



const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tables">
        <Stack.Screen
        name="Tables"
        component={Tables}
        options={{
          headerTintColor: "#f92e6a"
        }}
        />
        <Stack.Screen
        name="Order"
        component={Order}
        options={{
          headerTintColor: "#f92e6a"
        }}
        />
        <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          headerTintColor: "#f92e6a"
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

