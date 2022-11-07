import { View, Text, FlatList, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView } from "react-native";
import { useEffect, useState } from "react";

import CustomTextInput from "./CustomTextInput";
import CustomNumberInput from "./CustomNumberInput";
import CustomNewTextInput from "./CustomNewTextInput";
import CustomNewNumberInput from "./CustomNewNumberInput";

import {  MaterialCommunityIcons } from "@expo/vector-icons"

import firebase from "../../config/firebaseConfig";
import styles from "./style"

export default function Menu() {
    const database = firebase.firestore()
    const [produtos, setProdutos] = useState([])
    const [popUp, setPopUp] = useState(false)
    const [newProductName, setNewProductName] = useState("")
    const [newProductPrice, setNewProductPrice] = useState("0")
    const [store, setStore] = useState("")


    useEffect(() => {
        database.collection("Users").doc("PHc3F9Pjnw6Fg12SUlKE").onSnapshot((query) => {
            const list = []
            setStore(query.data().store.name)
            query.data().store.menu.forEach(el => {
                list.push({ ...el })
            })
            setProdutos(list)
        })
    }, [])

    const deleteProduct = (index) => {
        produtos.splice(index, 1)
        setProdutos(produtos => {
            [...produtos]
        })
        database.collection("Users").doc("PHc3F9Pjnw6Fg12SUlKE").update({
            store: {
                menu: [...produtos],
                name: store
            }
        })

    }

    const addProduct = () => {
        if (popUp) {
            setPopUp(false)
            setNewProductName("")
            setNewProductPrice("0")
            Keyboard.dismiss()
        } else {
            setPopUp(true)
        }
    }

    const createNewProduct = () => {
        setPopUp(false)
        let produto = { name: newProductName, price: Number(newProductPrice) }
        database.collection("Users").doc("PHc3F9Pjnw6Fg12SUlKE").update({
            store: {
                menu: [...produtos, produto],
                name: store
            }
        })
        setNewProductName("")
        setNewProductPrice("0")
        setPopUp(false)
        Keyboard.dismiss()
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.title, popUp ? { opacity: 0.3 } : false]} onTouchStart={Keyboard.dismiss}>Cardápio</Text>
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 100}
                enabled={true}
            >
                <View style={styles.list} onTouchStart={popUp ? Keyboard.dismiss : false}>
                    <FlatList style={popUp ? { opacity: 0.3 } : false}
                        pointerEvents={popUp ? "none" : "auto"}
                        data={produtos}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.card}>
                                    <View>
                                        <Text style={styles.description}>Nome</Text>
                                        <CustomTextInput style={styles.nameInput} name={item.name} setProdutos={setProdutos} produtos={produtos} index={index} setPopUp={setPopUp} storeName={store} />
                                    </View>
                                    <Text style={styles.description}>Preço</Text>
                                    <View style={styles.priceAndClose}>
                                        <CustomNumberInput style={styles.priceInput} price={item.price} setProdutos={setProdutos} produtos={produtos} index={index} setPopUp={setPopUp} storeName={store}/>
                                        <TouchableOpacity
                                            onPress={() => deleteProduct(index)}
                                        >
                                            <MaterialCommunityIcons
                                                name="close-box"
                                                size={30}
                                                color={"#f92e6a"}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }} />
                </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
                onPress={addProduct}
                style={styles.btnAddProduct}
            >
                <MaterialCommunityIcons
                    name="plus-box"
                    size={60}
                    color={"#f92e6a"}
                />
            </TouchableOpacity>
            <View style={popUp ? styles.popUp : { display: "none" }}>
                <View>
                    <Text style={[styles.description, {}]}>Nome</Text>
                    <CustomNewTextInput style={styles.nameInput} placeholder={"Nome do Novo Produto"} name={newProductName} textChange={setNewProductName} popUpOn={popUp} />
                </View>
                <Text style={styles.description}>Preço</Text>
                <View style={styles.priceAndClose}>
                    <CustomNewNumberInput style={styles.priceInput} price={newProductPrice} priceChange={setNewProductPrice} popUpOn={popUp} />
                    <TouchableOpacity
                        onPress={() => createNewProduct()}
                    >
                        <MaterialCommunityIcons
                            name="checkbox-marked"
                            size={50}
                            color={"#f92e6a"}
                        />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}