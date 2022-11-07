import { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import {  MaterialCommunityIcons } from "@expo/vector-icons"


import styles from "./style"

import firebase from "../../config/firebaseConfig";

export default function Store() {
    const database = firebase.firestore()
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
            <View style={styles.title}>
            <MaterialCommunityIcons
                name="storefront"
                size={120}
                color={"#f92e6a"}
            />
            <Text style={styles.storeName}>{store.name}</Text>
            </View>
            <Text style={styles.geral}>Visão Geral</Text>
            <View style={styles.infos}>
            <Text style={styles.tag}>Pedidos</Text>
            <Text  style={styles.desc}>Finalizados: {finishedOrders.length}</Text>
            <Text style={styles.desc}>Com observações: {finishedOrders.filter(el => el.observacoes?el:false).length}</Text>
            <Text style={styles.desc}>Hoje: {finishedOrders.filter(el => {
                const data = new Date(el.date.seconds * 1000 + el.date.nanoseconds/1000000)
                const day = data.getDate();
                const currentDay = new Date().getDate()
                return day === currentDay
            }).length}</Text>
            </View>
        </ScrollView>
    )
}