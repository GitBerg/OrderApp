import { View, Text, TouchableOpacity, TextInput, Keyboard } from "react-native";

import firebase from "firebase";

import styles from "./style";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import { useState } from "react";

export default function Settings({navigation}){ 

    const [dontSeePassword, setDontSeePassWord] = useState(true)

    
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            navigation.navigate("Login")
          }).catch((error) => {
            console.log(error);
          });
    }

    return(
        <View style={styles.container} onTouchStart={Keyboard.dismiss}>
            <Text style={styles.title}>Configurações do Usuário</Text>
            <View style={styles.card}>
                <Text style={styles.description}>Nome da Loja</Text>
                <TextInput style={styles.input} placeholder="Digite o nome da loja"/>
                <Text style={styles.description}>Senha</Text>
                <View style={{justifyContent:"center"}}>
                <TextInput style={styles.input} secureTextEntry={dontSeePassword} placeholder="Digite a nova senha"/>
                <MaterialCommunityIcons
                onPress={() => setDontSeePassWord(!dontSeePassword)}
                style={styles.passwordEye}
                    name={dontSeePassword? "eye-outline":"eye-off-outline"}
                    size={30}
                    color={"red"}
                />
                </View>
            </View>
            <TouchableOpacity><Text>Salvar</Text></TouchableOpacity>
            <TouchableOpacity onPress={signOut}><Text>Sair</Text></TouchableOpacity>
            <TouchableOpacity><Text>Excluir Conta</Text></TouchableOpacity>
        </View>
    )
}