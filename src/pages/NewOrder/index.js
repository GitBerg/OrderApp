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
    const [totalValue, setTotalValue ] = useState(0);

    // const [finalizado, setFinalizado] = useState(false);

    useEffect(() => {
        database.collection("Users").doc("PHc3F9Pjnw6Fg12SUlKE").onSnapshot((query) => {
            const list = []
            
            query.data().store.menu.forEach(el => {
                list.push({ ...el, qtd: 0 })
            })
            setProdutos(list)
        })
    }, [])


    function calcTotalValue(){
        let totalPrice = produtos.filter(el => el.qtd > 0).reduce((total, produto)=> total + produto.price*produto.qtd, 0)
        setTotalValue(totalPrice)
    }


    function addOrder() {
        let products = produtos.filter((el) => {
            return el.qtd > 0
        })

        database.collection("Orders").add({
            mesa: mesa,
            products: products,
            observacoes: observacoes,
            date: new Date(),
            finalizado: false,
            total: totalValue
        })

        navigation.navigate("Pedidos")
    }

    return (
        <KeyboardAvoidingView  
            style={styles.kav}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 130 : 140}
        >
            <View style={styles.container} >
                <Text style={styles.title} onTouchStart={Keyboard.dismiss}>Novo Pedido</Text>
                <Text style={styles.description} onTouchStart={Keyboard.dismiss}>Mesa:</Text>

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
                    style={Platform.OS == "ios" ?{minHeight:"68%"}:{minHeight:"63%"} }
                    data={produtos}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <View style={styles.card}>
                                    <View style={styles.cardDescription}>
                                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.name}</Text>
                                        <Text style={{ fontWeight: "bold" }}>{"R$" + item.price}</Text>
                                    </View>
                                    <View style={styles.qtd}>
                                        <Text style={{ fontWeight: "bold" }}>Qtd:</Text>
                                        <View style={styles.btns}>
                                            <TouchableOpacity
                                                disabled={item.qtd === 0 ? true : false}
                                                style={item.qtd === 0 ? { opacity: 0.5 } : { opacity: 1 }}
                                                onPress={() => {
                                                    item.qtd--
                                                    let index = produtos.indexOf(item)
                                                    let list = [...produtos]
                                                    list[index] = item
                                                    setProdutos(list)
                                                    calcTotalValue()
                                                }}
                                            >
                                                <FontAwesome
                                                    name="minus-circle"
                                                    size={35}
                                                    color={"#f92e6a"}
                                                >
                                                </FontAwesome>
                                            </TouchableOpacity>
                                            <Text style={{width:10}}>{item.qtd}</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    item.qtd++
                                                    let index = produtos.indexOf(item)
                                                    let list = [...produtos]
                                                    list[index] = item
                                                    setProdutos(list)
                                                    calcTotalValue()
                                                }}>
                                                <FontAwesome
                                                    name="plus-circle"
                                                    size={35}
                                                    color={"#f92e6a"}
                                                >
                                                </FontAwesome>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
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
                <View style={styles.footer}>
                    <Text style={{ fontWeight: "bold", fontSize: 18, color: "#f92e6a" }}>Total: R${totalValue}</Text>
                    <TouchableOpacity
                        style={styles.buttonNewOrder}
                        onPress={() => {
                            addOrder()
                        }}
                    >
                        <Text style={styles.iconButton}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}