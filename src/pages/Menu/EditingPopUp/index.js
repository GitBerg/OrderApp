import { View, Text, FlatList, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { useEffect, useState } from "react";

import {  MaterialCommunityIcons } from "@expo/vector-icons"

export default function EditingPopUp(props){


    const handleUpdate = () => {
        let newArray = [...props.produtos]
        newArray[props.update.index] = {name:props.update.name, price: props.update.price}
        let isDifferent = props.produtos.some((produto, index) => produto.name !== newArray[index].name)
        if(isDifferent){
            props.setProdutos([...newArray])
            props.database.collection(props.user).doc(props.doc).update({
                    menu: [...newArray]
            })
            Keyboard.dismiss()
            props.setEditing(false)
        }else{
            Keyboard.dismiss()
            props.setEditing(false)
        }
    }
    
 return(
    <View style={props.editing ? props.style.popUp : { display: "none" }}>
        <View>
            <Text style={props.style.description}>Nome</Text>
            <TextInput style={props.style.nameInput} value={props.update.name} onChangeText={props.setUpdate.setName} />
        </View>
        <Text style={props.style.description}>Preço</Text>
        <View style={props.style.priceAndClose}>
            <TextInput style={props.style.priceInput} selectTextOnFocus={true} keyboardType={"number-pad"} value={props.update.price} onChangeText={props.setUpdate.setPrice} />
            <TouchableOpacity
                onPress={() => handleUpdate()}
            >
                <MaterialCommunityIcons
                    name="checkbox-marked"
                    size={50}
                    color={"#f92e6a"}
                />
            </TouchableOpacity>
        </View>
    </View>
 )
}