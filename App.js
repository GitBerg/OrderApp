import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NewOrder from "./src/pages/NewOrder";
import Details from "./src/pages/Details";
import FView from "./src/pages/FView";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";

import Routes from "./src/routes";

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
             <Stack.Screen
              name="Registrar"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
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

