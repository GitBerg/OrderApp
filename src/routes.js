import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FontAwesome, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { createStackNavigator } from "@react-navigation/stack";

import Menu from "./pages/Menu";
import FinalizedOrders from "./pages/FinalizedOrders";
import Settings from "./pages/Settings";
import Leadboard from "./pages/Leadboard";
import Order from "./pages/Order";
import NewOrder from "./pages/NewOrder";

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export default function Routes() {
    return(
        <Tab.Navigator
            initialRouteName="Order Notes"
            screenOptions={{
                tabBarActiveTintColor: "#f92e6a",
                tabBarStyle: {
                    position: "absolute",
                    bottom: 0,
                    height:90,
                    borderTopColor: "#f92e6a55",
                    elevation: 0,
                    paddingBottom: 30,
                    paddingTop: 10
                },
            }}
        >

                <Tab.Screen
                name="Pedidos"
                component={Order}
                options={{
                  headerTintColor: "#f92e6a",
                  headerLeft: null,
                  tabBarIcon: ({color, size, focused} ) => {
                    if(focused)
                        return <MaterialCommunityIcons
                        name="text-box-multiple-outline"
                        size={size}
                        color={color}
                    />

                    return   <MaterialCommunityIcons
                        name="text-box-multiple-outline"
                        size={size}
                        color={color}
                    />
                  }            
                }}
            />
            <Tab.Screen
                name="Finalizados"
                component={FinalizedOrders}
                options={{
                  headerTintColor: "#f92e6a",
                  headerLeft: null,
                  tabBarIcon: ({color, size, focused} ) => {
                    if(focused)
                        return <MaterialCommunityIcons
                        name="text-box-check-outline"
                        size={size}
                        color={color}
                    />

                    return   <MaterialCommunityIcons
                        name="text-box-check-outline"
                        size={size}
                        color={color}
                    />
                  }, 
                }}
                
            />
            <Tab.Screen
                name="Cardápio"
                component={Menu}
                options={{
                  headerTintColor: "#f92e6a",
                  tabBarIcon: ({color, size, focused} ) => {
                    if(focused)
                        return  <MaterialCommunityIcons
                        name="book-open-page-variant-outline"
                        size={size}
                        color={color}
                    />
                    return <MaterialCommunityIcons
                        name="book-open-page-variant-outline"
                        size={size}
                        color={color}
                    />
                  }
                  
                }}
            />
            <Tab.Screen
                name="Leadboard"
                component={Leadboard}
                options={{
                  headerTintColor: "#f92e6a",
                  tabBarIcon: ({color, size, focused} ) => {
                    if(focused)
                        return  <MaterialCommunityIcons
                        name="trophy-outline"
                        size={size}
                        color={color}
                    />
                    return  <MaterialCommunityIcons
                        name="trophy-outline"
                        size={size}
                        color={color}
                    />
                  }
                }}
            />
            <Tab.Screen
                name="Editar"
                component={Settings}
                options={{
                  headerTintColor: "#f92e6a",
                  tabBarIcon: ({color, size, focused} ) => {
                    if(focused)
                        return  <AntDesign
                        name="setting"
                        size={size}
                        color={color}
                    />
                    return  <AntDesign
                        name="setting"
                        size={size}
                        color={color}
                    />
                  }
                }}
            />
    </Tab.Navigator>
    )
} 