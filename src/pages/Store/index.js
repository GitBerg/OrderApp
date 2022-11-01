import { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";

import styles from "./style"

import database from "../../config/firebaseConfig";

export default function Store() {

    const [store, setStore] = useState({})
    const [finishedOrders, setFinishedOrders] = useState([])

    useEffect(() => {

        fetchUser()
        fetchOrder()

    }, [])

    const fetchUser = async () => {
        try {
            database.collection("Users").doc("PHc3F9Pjnw6Fg12SUlKE").onSnapshot((query) => {
                const value = query.data().store
                setStore(value)
            })
        } catch (error) {
            console.log(error);
        }

    }

    const fetchOrder = async () => {
        try {
            database.collection("Orders").where("store", "==", store.name).onSnapshot((query) => {
                const finalizedOrders = []
                query.forEach(element => {
                    if (element.data().finalizado === true)
                        finalizedOrders.push({ ...element.data(), id: element.id })
                });
                setFinishedOrders(finalizedOrders)
            })
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.storeName}>{store.name}</Text>
            <Text>Pedidos:</Text>
            <Text>Total finalizados: {finishedOrders.length}</Text>
        </ScrollView>
    )
}