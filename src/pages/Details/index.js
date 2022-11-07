import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Keyboard, TouchableWithoutFeedback, Image, KeyboardAvoidingView, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons"

import firebase from "../../config/firebaseConfig";
import styles from "./style"

export default function Details({navigation, route}) {

    const [mesaEdit, setMesaEdit] = useState(route.params.mesa);
    const [produtos, setProdutos] = useState([]);
    const [observacoesEdit, setObservacoesEdit] = useState(route.params.observacoes);
    const [avoidingView, setAvoidingView] = useState(false)
    const database = firebase.firestore()

    useEffect(() => {
        database.collection(navigation.getState().routes[0].params.userId).onSnapshot((query) => {
            const list = []
            
            // query.data().store.menu.forEach((el, index) => {
            //     list.push({ ...el, qtd: 0})
            //         route.params.products.forEach(e =>{
            //             el.name === e.name? list[index] = e: false
            //         })
            // })
            setProdutos(list)
        })

    }, [])

    

    function addOrder() {
        let products = produtos.filter((el) => {
            return el.qtd > 0
        })

        database.collection("Orders").doc(route.params.id).update({
            mesa: mesaEdit,
            products: products,
            observacoes: observacoesEdit,
        })

        navigation.navigate("Pedidos")
        
    }

    return (
        <View style={styles.kav}>
            <View style={styles.container}>
                <Text style={styles.title}>Mesa {route.params.mesa<=9 ? "0" + route.params.mesa: route.params.mesa }</Text>
                <Text style={styles.description}>Mesa:</Text>

                <KeyboardAvoidingView
                behavior= {Platform.OS === 'ios'? 'padding': 'height'}
                enabled = {avoidingView}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o número da mesa"
                    onChangeText={setMesaEdit}
                    value={mesaEdit}
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
    
                                                }}
                                            >
                                                <FontAwesome
                                                    name="minus-circle"
                                                    size={30}
                                                    color={"#f92e6a"}
                                                >
                                                </FontAwesome>
                                            </TouchableOpacity>
                                            <Text>{item.qtd}</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    item.qtd++
                                                    let index = produtos.indexOf(item)
                                                    let list = [...produtos]
                                                    list[index] = item
                                                    setProdutos(list)
                                                    
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
                            </View>
                        )
                    }
                    }
                />
                <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset = {Platform.OS === 'ios'? 90: 100}
                enabled = {avoidingView}>
                     <View style={{backgroundColor: "#fff"}}>
                <Text style={styles.description}>Observações:</Text>
                <TextInput
                    style={styles.inputObservation}
                    placeholder="Digite as observacoes do pedido"
                    onChangeText={setObservacoesEdit}
                    value={observacoesEdit}
                    multiline={true}
                    numberOfLines={4}
                    onTouchStart={() => setAvoidingView(true)}
                />
                </View>
                </KeyboardAvoidingView>
                <View style={styles.footer}>
                    <Text style={{ fontWeight: "bold", fontSize: 18, color: "#f92e6a" }}>Total: R${produtos.filter(el => el.qtd > 0).reduce((total, produto)=> total + produto.price*produto.qtd, 0)}</Text>
                    <TouchableOpacity
                        style={styles.buttonUpdateOrder}
                        onPress={() => {
                            addOrder()
                        }}
                    >
                        <Text style={styles.iconButton}>Atualizar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}