import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FontAwesome, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"

import Menu from "./pages/Menu";
import FinalizedOrders from "./pages/FinalizedOrders";
import Settings from "./pages/Settings";
import Store from "./pages/Store";
import Order from "./pages/Order";

const Tab = createBottomTabNavigator()

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
                name="Loja"
                component={Store}
                options={{
                  headerTintColor: "#f92e6a",
                  tabBarIcon: ({color, size, focused} ) => {
                    if(focused)
                        return  <MaterialCommunityIcons
                        name="storefront-outline"
                        size={size}
                        color={color}
                    />
                    return  <MaterialCommunityIcons
                        name="storefront-outline"
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