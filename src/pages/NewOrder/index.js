import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Keyboard, TouchableWithoutFeedback, Image, KeyboardAvoidingView, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons"

import { ImagesAssets } from '../../../assets/ImagesAssets';


import database from "../../config/firebaseConfig";
import styles from "./style"

export default function NewOrder({ navigation }) {

    const [mesa, setMesa] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [observacoes, setObservacoes] = useState(null);
    const [value, setValue] = useState([]);

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
            observacoes: observacoes,
            date: new Date(),
            finalizado: false
        })

        navigation.navigate("Order Notes")
    }

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={10}
        >
            <View style={{ width: "100%", height: "95%" }}>
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
                    style={styles.orderMenu}
                    data={produtos}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                {item.map((el, index) => {
                                    let qtd = 0
                                    return (
                                        <View key={index} style={styles.card}>
                                            <View style={styles.cardDescription}>
                                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>{el.name}</Text>
                                                <Text style={{ fontWeight: "bold" }}>{"R$" + el.price}</Text>
                                            </View>
                                            <View style={styles.qtd}>
                                                <Text>Qtd:</Text>
                                                <View style={styles.btns}>
                                                    <TouchableOpacity
                                                        onPress={() =>{
                                                            
                                                            setValue(value => value-=1)
                                                        }}
                                                    >
                                                        <FontAwesome
                                                            name="minus-circle"
                                                            size={30}
                                                            color={"#f92e6a"}
                                                        >
                                                        </FontAwesome>
                                                    </TouchableOpacity>
                                                    <Text>{qtd}</Text>
                                                    <TouchableOpacity
                                                      onPress={() =>{
                                                        setValue(value => value+=1)
                                                    }}>
                                                        <FontAwesome
                                                            name="plus-circle"
                                                            size={30}
                                                            color={"#f92e6a"}
                                                        >
                                                        </FontAwesome>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        )
                    }
                    }
                />
                <Text style={styles.description}>Observações:</Text>
                <TextInput
                    style={styles.inputObservation}
                    placeholder="Digite as observacoes do pedido"
                    onChangeText={setObservacoes}
                    value={observacoes}
                    multiline={true}
                    numberOfLines={4}
                />
                <TouchableOpacity
                    style={styles.buttonNewOrder}
                    onPress={() => {
                        addOrder()
                    }}
                >
                    <Text style={styles.iconButton} >Adicionar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}