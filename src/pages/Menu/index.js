import { View, Text, FlatList, ScrollView } from "react-native";

import styles from "./style"

export default function Menu(){
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Cardápio</Text>
            <FlatList style={styles.flatList} 
                        renderItem={({item})=>{
                            return(
                                <View>
                                    <Text>Testando elementos</Text>
                                </View>
                            )
                        }}/>

        </ScrollView>
    )
}