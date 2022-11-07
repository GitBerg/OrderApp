import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Keyboard, TouchableWithoutFeedback, Image, KeyboardAvoidingView, Platform } from "react-native";

import firebase from "../../config/firebaseConfig";
import styles from "./style"

export default function FView({navigation, route}) {
    const database = firebase.firestore()
    const [mesaEdit, setMesaEdit] = useState(route.params.mesa);
    const [produtos, setProdutos] = useState([]);
    const [observacoesEdit, setObservacoesEdit] = useState(route.params.observacoes);

    useEffect(() => {

        database.collection("Users").doc("PHc3F9Pjnw6Fg12SUlKE").onSnapshot((query) => {
            const list = []
            
            query.data().store.menu.forEach((el, index) => {
                list.push({ ...el, qtd: 0})
                    route.params.products.forEach(e =>{
                        el.name === e.name? list[index] = e: false
                    })
            })
            let newList = list.filter(e => e.qtd > 0)
            setProdutos(newList)
        })
    }, [])

    
    function deleteOrder(id) {
        database.collection("Orders").doc(id).delete()
        navigation.navigate("Finalizados")
    }

    return (
        <KeyboardAvoidingView style={styles.kav}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Mesa {route.params.mesa<=9 ? "0" + route.params.mesa: route.params.mesa } Finalizado</Text>
                <Text style={styles.description}>Mesa:</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Digite o número da mesa"
                    value={mesaEdit}
                    keyboardType={"number-pad"}
                    editable={false}
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
                                            <Text>{item.qtd}</Text>
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
                    editable={false}
                    value={observacoesEdit}
                    multiline={true}
                    numberOfLines={4}
                />
                <View style={styles.footer}>
                    <Text style={{ fontWeight: "bold", fontSize: 18, color: "#f92e6a" }}>Total: R${produtos.filter(el => el.qtd > 0).reduce((total, produto)=> total + produto.price*produto.qtd, 0)}</Text>
                    <TouchableOpacity
                        style={styles.buttonDeleteOrder}
                        onPress={() => {
                            deleteOrder(route.params.id)
                        }}
                    >
                        <Text style={styles.iconButton}>Apagar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}