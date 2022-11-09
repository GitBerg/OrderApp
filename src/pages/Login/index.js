import { View, SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import {  MaterialCommunityIcons } from "@expo/vector-icons"

import firebase from "firebase";

import styles from "./style";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

export default function Login({navigation}){

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[error, setError] = useState(false)

    const isFocused = useIsFocused()

    useEffect(() => {

        !isFocused? setEmail("") & setPassword(""): false

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              let uid = user.uid;
              navigation.navigate("Todos os Pedidos", { screen: "Pedidos", params:{userId: uid }})
            } else {
                isFocused && error? setError(false):false
            }
          });
    }, [isFocused, email, password])

    const signIn = () =>{
        if(email === "" || password === ""){
            setError(true)
        }else{
            try{
                firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              let user = userCredential.user;
              navigation.navigate("Todos os Pedidos", { screen: "Pedidos", params:{userId: user.uid }})
            })
            .catch((error) => {
                setError(true)
                let errorCode = error.code;
                let errorMessage = error.message;
            });
            }catch(err){
               console.log(err);
            } 
        }
    }


    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.slogan}>
            <Text style={styles.title}>orderNotes</Text>
            <MaterialCommunityIcons
                    name="notebook-edit"
                    size={100}
                    color={"#f92e44"}
                />
            </View>
            <View style={styles.inputs}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput placeholder="E-mail" style={styles.input} value={email} onChangeText={setEmail}></TextInput>
            <Text style={styles.label}>Senha</Text>
            <TextInput secureTextEntry={true} placeholder="Senha" value={password} onChangeText={setPassword} style={styles.input}></TextInput>
            </View>
            <View style={error? styles.error: [styles.error, {display: "none"}]}>
                <MaterialCommunityIcons
                    name="alert-circle"
                    size={23}
                    color={"#b5b5b5"}
                /><Text>E-mail ou senha incorretos</Text>
            </View>
            <View style={styles.buttons}>
            <TouchableOpacity style={styles.btn} onPress={signIn}><Text style={styles.btnTxt}>Login</Text></TouchableOpacity>
            <Text style={styles.register} onPress={() => navigation.navigate("Registrar")}>Registre-se</Text>
            </View>
        </SafeAreaView>
    )
}
