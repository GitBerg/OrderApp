import { View, Text, FlatList, ScrollView, VirtualizedList, TextInput } from "react-native";
import { useEffect, useState } from "react";

import database from "../../config/firebaseConfig";
import styles from "./style"

export default function Menu(){

    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        database.collection("/Users/PHc3F9Pjnw6Fg12SUlKE/Store/").onSnapshot((query) => {
            const list = []

            query.forEach(element => {
                element.data().menu.forEach(el => {
                    list.push({ ...el})
                })
            });
            setProdutos(list)
        })
    }, [])

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Cardápio</Text>
            <View>
            <FlatList style={styles.flatList} 
                        data={produtos}
                        showsVerticalScrollIndicator = {false}
                        renderItem={({item})=>{
                            return(
                                <View style={styles.card}>
                                    <View>
                                        <Text  style={styles.description}>Name</Text>
                                        <TextInput editable={false} style={styles.nameInput} value={item.name}/>
                                   </View>
                                   <View>
                                        <Text  style={styles.description}>Price</Text>
                                        <TextInput editable={false} style={styles.priceInput} value={JSON.stringify(item.price)}/>
                                   </View>
                                </View>
                            )
                        }}/>
                        </View>

        </View>
    )
}