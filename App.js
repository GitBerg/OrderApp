import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Order from "./src/pages/Order";
import NewOrder from "./src/pages/NewOrder";
import Menu from "./src/pages/Menu";
import Details from "./src/pages/Details";



const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Orders">
        <Stack.Screen
        name="Order Notes"
        component={Order}
        options={{
          headerTintColor: "#f92e6a"
        }}
        />
        <Stack.Screen
        name="New Order"
        component={NewOrder}
        options={{
          headerTintColor: "#f92e6a"
        }}
        />
         <Stack.Screen
        name="Details"
        component={Details}
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

