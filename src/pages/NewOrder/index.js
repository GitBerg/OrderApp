import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Keyboard,KeyboardAvoidingView, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons"

import firebase from "../../config/firebaseConfig";
import styles from "./style"

export default function NewOrder({ navigation, route }) {
    const database = firebase.firestore()
    const [mesa, setMesa] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [observacoes, setObservacoes] = useState(null);
    const [totalValue, setTotalValue ] = useState(0);
    const [avoidingView, setAvoidingView] = useState(false)
    const user = route.params.userId


    useEffect(() => {
        database.collection(route.params.userId).onSnapshot((query) => {
            const list = []
            query.forEach(el => {
                el.data()?.menu.forEach(prod => {
                    list.push({ ...prod, qtd: 0 })
                })
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
            userId: route.params.userId,
            mesa: mesa,
            products: products,
            observacoes: observacoes,
            date: new Date(),
            finalizado: false,
            total: totalValue
        })

        navigation.navigate("Pedidos", {userId: user})
    }

    return (
        <View
        style={styles.kav}
        >
            <View style={styles.container} >
            <View onTouchStart={() => closePopUp()} style={{width:"100%", height:"100%", position: "absolute"}}></View>
                <Text style={styles.title} onTouchStart={Keyboard.dismiss}>Novo Pedido</Text>
                <Text style={styles.description} onTouchStart={Keyboard.dismiss}>Mesa:</Text>

                <KeyboardAvoidingView
                behavior= {Platform.OS === 'ios'? 'padding': 'height'}
                enabled = {avoidingView}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o número da mesa"
                    onChangeText={setMesa}
                    value={mesa}
                    maxLength={2}
                    keyboardType={"number-pad"}
                    onTouchStart={() => setAvoidingView(false)}
                />
                </KeyboardAvoidingView>
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
                <KeyboardAvoidingView
                behavior={Platform.OS === 'ios'? "position": "height"}
                keyboardVerticalOffset = {Platform.OS === 'ios'? 90: 100}
                enabled = {avoidingView}>
                <View style={{backgroundColor: "#fff"}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={styles.description}>Observações:</Text>
                        <Text style={styles.description}> {observacoes?140 - observacoes.length: 140}/140</Text>
                    </View>
                <TextInput
                    style={styles.inputObservation}
                    placeholder="Digite as observacoes do pedido"
                    onChangeText={setObservacoes}
                    value={observacoes}
                    keyboardType ={"default"}
                    multiline={true}
                    numberOfLines={4}
                    maxLength={140}
                    onTouchStart={() => setAvoidingView(true)}
                />
                </View>
                </KeyboardAvoidingView>
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
        </View>
    )
}