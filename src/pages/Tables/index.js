import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useState, useEffect } from "react"

import database from "../../config/firebaseConfig";
import { FontAwesome } from "@expo/vector-icons"
import styles from "./style"

export default function Tables({ navigation }){

    const [tables, setTables] = useState([])

    useEffect(() => {
        database.collection("Tables").onSnapshot((query) => {
            const list = []
            query.forEach(element => {
                list.push({...element.data(), id: element.id})
            });
            setTables(list)
        })
    }, [])

    return(
        <View style={styles.container}>
            <FlatList/>
            <TouchableOpacity>
                <Text styles={styles.iconButton}>+</Text>
            </TouchableOpacity>
        </View>
    )
}