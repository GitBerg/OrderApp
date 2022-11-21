import { View, Text, FlatList, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { useEffect, useState } from "react";

import CustomNewTextInput from "./CustomNewTextInput";
import CustomNewNumberInput from "./CustomNewNumberInput";
import EditingPopUp from "./EditingPopUp";

import {  MaterialCommunityIcons } from "@expo/vector-icons"

import firebase from "../../config/firebaseConfig";
import styles from "./style"

export default function Menu({navigation}) {
    const database = firebase.firestore()
    const [docId, setDocId] = useState("")
    const [produtos, setProdutos] = useState([])
    const [popUp, setPopUp] = useState(false)
    const [newProductName, setNewProductName] = useState("")
    const [newProductPrice, setNewProductPrice] = useState("0")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [index, setIndex] = useState(0)
    const [editing, setEditing] = useState(false)


    useEffect(() => {

        try{
            database.collection(navigation.getState().routes[0].params.userId).onSnapshot((query) => {
                const list = []
                
                query.forEach(element => {
                   setDocId(element._delegate._document.key.path.segments[6]);
                   element.data().menu.forEach( el => {
                        list.push({ ...el })
                   })
                });
                setProdutos(list)
            })
        }catch(error){
            console.log(error);
        }
        
       
    }, [])

    const deleteProduct = (index) => {
        produtos.splice(index, 1)
        setProdutos(produtos => {
            [...produtos]
        })
        database.collection(navigation.getState().routes[0].params.userId).doc(docId).update({
                menu: [...produtos]
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
        let produto = { name: newProductName, price: newProductPrice }
        database.collection(navigation.getState().routes[0].params.userId).doc(docId).update({
                menu: [...produtos, produto]
        })
        setNewProductName("")
        setNewProductPrice("0")
        setPopUp(false)
        Keyboard.dismiss()
    }

    const handleSelectProd = (name, price, index) => {
        setName(name)
        setPrice(price)
        setIndex(index)
        setEditing(true)
    }

    const closePopUp = () => {
        setEditing(false)
        setPopUp(false)
        Keyboard.dismiss
    }

    return (
        <View style={styles.container} >
            <View onTouchStart={() => closePopUp()} style={{width:"100%", height:"100%", position: "absolute"}}></View>
            <Text style={[styles.title, popUp||editing ? { opacity: 0.3 } : false]} onTouchStart={Keyboard.dismiss}>Cardápio</Text>
                <View style={styles.list} pointerEvents={popUp||editing ? "none" : "auto"} onTouchStart={popUp ? Keyboard.dismiss : false}>
                    <FlatList style={popUp||editing ? { opacity: 0.3 } : false}
                        data={produtos}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={styles.card} onPress={() => handleSelectProd(item.name, item.price, index)}>
                                    <View>
                                        <Text style={styles.description}>Nome</Text>
                                        <TextInput
                                        pointerEvents="none"
                                            editable={false}
                                            value={item.name}
                                            selectTextOnFocus={false}
                                            style={styles.nameInput}
                                        />
                                    </View>
                                    <Text style={styles.description}>Preço</Text>
                                    <View style={styles.priceAndClose}>
                                        <TextInput
                                        pointerEvents="none"
                                            editable={false} 
                                            value={item.price}
                                            selectTextOnFocus={false}
                                            style={styles.priceInput}
                                        />
                                        <TouchableOpacity
                                            onPress={() => deleteProduct(index)}
                                        >
                                            <MaterialCommunityIcons
                                                name="close-box"
                                                size={40}
                                                color={"#f92e6a"}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            )
                        }} />
                </View>
            <TouchableOpacity
                onPress={addProduct}
                style={editing?[styles.btnAddProduct,{ opacity: 0.3 }]:styles.btnAddProduct}
            >
                <MaterialCommunityIcons
                    name="plus-box"
                    size={60}
                    color={"#f92e6a"}
                />
            </TouchableOpacity>
            <View style={popUp ? styles.popUp : { display: "none" }}>
                <View>
                    <Text style={styles.description}>Nome</Text>
                    <CustomNewTextInput style={styles.nameInput} placeholder={"Nome do novo produto"} name={newProductName} textChange={setNewProductName} popUpOn={popUp} />
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
            <EditingPopUp 
                produtos = {produtos}
                setProdutos = {setProdutos}
                editing = {editing}
                setEditing = {setEditing}
                style={styles}
                database={database}
                update={{name, price, index}}
                setUpdate = {{setName, setPrice}}
                user={navigation.getState().routes[0].params.userId}
                doc={docId} 
            />
        </View>
    )
}