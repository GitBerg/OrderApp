import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useState, useEffect } from "react"

import database from "../../config/firebaseConfig";
import { FontAwesome } from "@expo/vector-icons"
import styles from "./style"

export default function Order({ navigation }) {

    const [order, setOrder] = useState([])

    useEffect(() => {
        database.collection("Orders").orderBy("date", "asc").onSnapshot((query) => {
            const list = []
            query.forEach(element => {
                list.push({ ...element.data(), id: element.id })
            });
            setOrder(list)
        })
    }, [])

    function deleteOrder(id) {
        database.collection("Orders").doc(id).delete()
    }

    function convertToDate(time) {
        const fireBaseTime = new Date(
            time.seconds * 1000 + time.nanoseconds / 1000000,
        );
        const atTime = fireBaseTime.toLocaleTimeString();
        return atTime
    }

    return (
        <View style={styles.container} >
            <Text style={styles.pageName}>Pedidos</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={order}
                style={styles.listOrders}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.Orders}>
                            <TouchableOpacity
                                style={styles.finishOrder}
                                onPress={() => {
                                    finishOrder(item.id)
                                }}>
                                <FontAwesome
                                    name="check-circle-o"
                                    size={23}
                                    color={"#f92e6a"}
                                >
                                </FontAwesome>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={item.observacoes? styles.descriptionOrderWarner:styles.descriptionOrder}
                                onPress={() => {
                                    navigation.navigate("Details", {
                                        id: item.id,
                                        products: item.products,
                                        mesa: item.mesa,
                                        observacoes: item.observacoes,
                                        finalizado: item.finalizado,
                                        totalValue: item.totalValue
                                    })
                                }}
                            >
                                {item.observacoes ? <FontAwesome 
                                    name="exclamation-circle"
                                    size={23}
                                    color={"#f92e6a"}></FontAwesome> : false}
                                <Text> <Text style={{ fontWeight: "bold" }}>Pedido:</Text> {index + 1}</Text>
                                <Text>  <Text style={{ fontWeight: "bold" }}>Mesa:</Text> {item.mesa}</Text>
                                <Text> <Text style={{ fontWeight: "bold" }}>Items:</Text> {item.products.reduce((acumulador, valorAtual) => acumulador + valorAtual.qtd, 0)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteOrder}
                                onPress={() => {
                                    deleteOrder(item.id)
                                }}>
                                <FontAwesome
                                    name="close"
                                    size={23}
                                    color={"#f92e6a"}
                                >
                                </FontAwesome>
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