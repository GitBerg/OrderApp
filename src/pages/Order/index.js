import { View, Text, TouchableOpacity, FlatList  } from "react-native";
import { useState, useEffect } from "react"

import database from "../../config/firebaseConfig";
import { FontAwesome } from "@expo/vector-icons"
import styles from "./style"

export default function Order({ navigation }){

    const [order, setOrder] = useState([])

    useEffect(() => {
        database.collection("Orders").onSnapshot((query) => {
            const list = []
            query.forEach(element => {
                list.push({...element.data(), id: element.id})
            });
            setOrder(list)
        })
    }, [])

    function deleteOrder(id){
        database.collection("Orders").doc(id).delete()
    }

    return(
        <View style={styles.container}>
            <Text style={styles.pageName}>Pedidos</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={order}
                renderItem={({item}) => {
                    return(
                    <View style={styles.Orders}>
                        <TouchableOpacity 
                        style={styles.deleteOrder}
                        onPress={() => {
                            deleteOrder(item.id)
                        }}>
                            <FontAwesome
                            name="star"
                            size={23}
                            color={"#f92e6a"}
                            >
                            </FontAwesome>
                         </TouchableOpacity>
                         <TouchableOpacity
                         style={styles.descriptionOrder}
                         onPress={()=> {
                            navigation.navigate("Details", {
                                id: item.id,
                                products: item.products,
                                totalValue: item.totalValue
                            })
                         }}
                         >
                           <Text> Mesa: {item.mesa}</Text>
                           <Text> Items: {item.products.length}</Text> 
                         </TouchableOpacity>
                    </View>
                    )
                }}
            />
            <TouchableOpacity 
                style={styles.buttonNewOrder}
                onPress={() => navigation.navigate("New Order")}>
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttonMenu}>
                <Text style={styles.iconButton}>Cardápio</Text>
            </TouchableOpacity>
        </View>
    )
}