import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NewOrder from "./src/pages/NewOrder";
import Details from "./src/pages/Details";
import FView from "./src/pages/FView";

import Routes from "./src/routes";



const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
              name="Todos os Pedidos"
              component={Routes}
              options={{
                headerShown: false,
                headerTintColor: "#f92e6a"
              }}
            />
       <Stack.Screen
              name="Novo Pedido"
              component={NewOrder}
              options={{
                headerTintColor: "#f92e6a"
              }}
            />
        <Stack.Screen
              name="Detalhes"
              component={Details}
              options={{
                headerTintColor: "#f92e6a"
              }}
            />
        <Stack.Screen
              name="Finalizado Detalhes"
              component={FView}
              options={{
                headerTintColor: "#f92e6a"
              }}
            />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

