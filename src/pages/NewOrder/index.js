import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Keyboard, TouchableWithoutFeedback, Image } from "react-native";

import { ImagesAssets } from '../../../assets/ImagesAssets';


import database from "../../config/firebaseConfig";
import styles from "./style"

export default function NewOrder({ navigation }) {

    const [mesa, setMesa] = useState(null);
    const [produtos, setProdutos] = useState([]);
    // const [finalizado, setFinalizado] = useState(false);

    useEffect(() => {
        database.collection("/Users/PHc3F9Pjnw6Fg12SUlKE/Store/").onSnapshot((query) => {
            const list = []
            query.forEach(element => {
                list.push(element.data().menu)
            });
            setProdutos(list)
        })
    }, [])



    function addOrder() {
        database.collection("Orders").add({
            mesa: mesa,
            date: new Date(),
            finalizado: false
        })

        navigation.navigate()
    }

    return (
            <View style={styles.container}>
                <Text style={styles.title}>Novo Pedido</Text>
                <Text style={styles.description}>Mesa:</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Digite o número da mesa"
                    onChangeText={setMesa}
                    value={mesa}
                    keyboardType={"number-pad"}
                />
                <Text style={styles.description}>Produtos:</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={produtos}
                    renderItem={({ item  }) => {
                        return (
                            <View>
                                {item.map((el, index) => {
                                    return(
                                    <View  key={index}>
                                        <Text style={{ fontWeight: "bold" }}>{index <= 9 ? "0" + (index + 1) : index}</Text>
                                        <Text style={{ fontWeight: "bold" }}>{el.name}</Text>
                                        <Text style={{ fontWeight: "bold" }}>{"R$" + el.price}</Text>
                                    </View>
                                    )
                                })}
                            </View>
                        )
                    }
                    }
                />
                <Text style={styles.description}>Observações:</Text>
                <TouchableOpacity
                    style={styles.buttonNewOrder}
                    onPress={() => {
                        addOrder()
                    }}
                >
                    <Text>Adicionar</Text>
                </TouchableOpacity>
            </View>
    )
}