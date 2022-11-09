import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useState, useEffect } from "react"

import firebase from "../../config/firebaseConfig";
import { FontAwesome, MaterialCommunityIcons, AntDesign} from "@expo/vector-icons"
import styles from "./style"

export default function FinalizedOrders({ navigation }) {
    const database = firebase.firestore()
    const [order, setOrder] = useState([])
    const userId = navigation.getState().routes[0].params.userId

    useEffect(() => {
        database.collection("Orders").orderBy("date", "desc").onSnapshot((query) => {
            const list = []
            query.forEach(element => {
                if(element.data().finalizado === true && element.data().userId === userId){
                    list.push({ ...element.data(), id: element.id })
                }
            });
            setOrder(list)
        })
    }, [])

    return (
        <View style={styles.container} >
            <Text style={styles.pageName}>Pedidos Finalizados</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={order}
                style={styles.listOrders}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.Orders}>
                            <TouchableOpacity
                                style={item.observacoes? styles.descriptionOrderWarner:styles.descriptionOrder}
                                onPress={() => {
                                    navigation.navigate("Finalizado Detalhes", {
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
                                <Text> <Text style={{ fontWeight: "bold" }}>Mesa:</Text> {item.mesa}</Text>
                                <Text>  <Text style={{ fontWeight: "bold" }}>Items:</Text> {item.products.reduce((acumulador, valorAtual) => acumulador + valorAtual.qtd, 0)}</Text>
                                <Text> <Text style={{ fontWeight: "bold" }}>R$</Text>{item.total}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    )
}