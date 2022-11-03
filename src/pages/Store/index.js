import { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";

import styles from "./style"

import database from "../../config/firebaseConfig";

export default function Store() {

    const [store, setStore] = useState({})
    const [finishedOrders, setFinishedOrders] = useState([])
    const [storeName, setStoreName] = useState("")

    useEffect(() => {
        fetchUser()
    }, [])
  
    const fetchUser = () => {
        try {
            database.collection("Users").doc("PHc3F9Pjnw6Fg12SUlKE").onSnapshot((query) => {
                const value = query.data().store
                const name = query.data().store.name
                database.collection("Orders").where("store", "==", name).onSnapshot((query) => {
                    const finalizedOrders = []
                    query.forEach(element => {
                        if (element.data().finalizado === true)
                            finalizedOrders.push({ ...element.data(), id: element.id })
                    });
                    setFinishedOrders(finalizedOrders)
                })
                setStore(value)
                setStoreName(name)
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.storeName}>{store.name}</Text>
            <Text>Pedidos</Text>
            <Text>Finalizados: {finishedOrders.length}</Text>
            <Text>Com observações: {finishedOrders.filter(el => el.observacoes?el:false).length}</Text>
            <Text>Hoje: {finishedOrders.filter(el => {
                const data = new Date(el.date.seconds * 1000 + el.date.nanoseconds/1000000)
                const day = data.getDate();
                const currentDay = new Date().getDate()
                return day === currentDay
            }).length}</Text>
        </ScrollView>
    )
}