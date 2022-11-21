import { View, Text, TouchableOpacity, TextInput, Keyboard, Alert } from "react-native";

import firebase from "firebase";

import styles from "./style";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import { useEffect, useState } from "react";

export default function Settings({navigation}){ 
    const [msg, setMsg] = useState("")
    const database = firebase.firestore()
    const [dontSeePassword, setDontSeePassWord] = useState(true)
    const [dontSeeOldPassword, setDontSeeOldPassWord] = useState(true)
    const [newPassword, setNewPassword] = useState("")
    const [store, setStore] = useState("")
    const user = firebase.auth().currentUser;
    const userId = firebase.auth().currentUser.uid
    const [docId, setDocId] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email, 
        oldPassword
    );


    const alertDeleteUser = () =>{
        Alert.alert(
            "Apagar conta?",
            "Deseja mesmo apagar a conta, está decisão é irreversivel!",
            [
              {
                text: "Sim",
                onPress: () => deleteUser()
              },
              {
                text: "Cancelar",
                style: "cancel"
              }
            ]
        )
    }

    const signOut = () => {
        try {
            firebase.auth().signOut().then(() => {
                navigation.navigate("Login")
              }).catch((error) => {
                console.log(error);
              });
        } catch (error) {
            console.log(error);
        }
       
    }

    const deleteUser = () => {
        try {
            user.delete().then(() => {
                database.
                navigation.navigate("Login")
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
       
    }

    const updateStoreName = () =>{
        database.collection(userId).doc(docId).update({
            store: store
        })
        setStore("")
    }

    const userUpdatePassword = async () => {
        try {
            if(newPassword.length > 0){
                let result = await user.reauthenticateWithCredential(credential);
                if(result.operationType === "reauthenticate"){
                    user.updatePassword(newPassword).then(() => {
                        setMsg("Senha alterada com sucesso!")
                    }).catch((error) => {
                        setMsg("Não foi possivel alterar a senha!")
                    });
                }else{
                    setMsg("Senha de usuário errada!")
                }
            }
            setNewPassword("")
            setOldPassword("")
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
            database.collection(userId).onSnapshot((query) => {
                query.forEach(el => setDocId(el.id))
            })
    })

    return(
        <View style={styles.container} onTouchStart={Keyboard.dismiss}>
            <Text style={styles.title}>Configurações do Usuário</Text>
            <View style={styles.card}>
                <Text style={styles.description}>Nome da Loja</Text>
                <TextInput style={styles.input} value={store} onChangeText={setStore} placeholder="Digite o novo nome da loja"/>
                <Text style={styles.description}>Senha Atual</Text>
                <View style={{justifyContent:"center"}}>
                <TextInput style={styles.input} value={oldPassword} selectTextOnFocus={false} onChangeText={setOldPassword} secureTextEntry={dontSeeOldPassword} placeholder="Digite a nova senha"/>
                <MaterialCommunityIcons
                onPress={() => setDontSeeOldPassWord(!dontSeeOldPassword)}
                style={styles.passwordEye}
                    name={dontSeeOldPassword? "eye-outline":"eye-off-outline"}
                    size={30}
                    color={"red"}
                />
                </View>
                <Text style={styles.description}>Nova Senha</Text>
                <View style={{justifyContent:"center"}}>
                <TextInput style={styles.input} value={newPassword} selectTextOnFocus={false} onChangeText={setNewPassword} secureTextEntry={dontSeePassword} placeholder="Digite a nova senha"/>
                <MaterialCommunityIcons
                onPress={() => setDontSeePassWord(!dontSeePassword)}
                style={styles.passwordEye}
                    name={dontSeePassword? "eye-outline":"eye-off-outline"}
                    size={30}
                    color={"red"}
                />
                </View>
            </View>
            <View style={msg? styles.error: [styles.error, {display: "none"}]}>
                <MaterialCommunityIcons
                    name="alert-circle"
                    size={23}
                    color={"#b5b5b5"}
                /><Text>{msg}</Text>
            </View>
            <View style={styles.btns}>
                <TouchableOpacity style={styles.btn}onPress={() => updateStoreName()&userUpdatePassword()}><Text style={{fontSize:20}}>Salvar</Text></TouchableOpacity>
                <TouchableOpacity style={styles.btn}onPress={signOut}><Text style={{fontSize:20}}>Sair</Text></TouchableOpacity>
            </View>
            <View style={styles.viewExcludeBtn}>
                <TouchableOpacity style={styles.excludeBtn} onPress={alertDeleteUser}><Text style={{fontSize:20, color: "#fff"}}>Excluir Conta</Text></TouchableOpacity>
            </View>
            <View></View>
        </View>
    )
}