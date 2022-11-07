import { View, SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import {  MaterialCommunityIcons } from "@expo/vector-icons"

import styles from "./style";

export default function Login(){
    return(
        <SafeAreaView style={styles.container}>
            <Text>Pagina de Login</Text>
            <Text>Login</Text>
            <TextInput placeholder="E-mail"></TextInput>
            <Text>Senha</Text>
            <TextInput secureTextEntry={true} placeholder="Senha"></TextInput>
            <View style={styles.error}>
                <MaterialCommunityIcons
                    name="alert-circle"
                    size={23}
                    color={"#b5b5b5"}
                /><Text>E-mail ou senha incorretos</Text>
            </View>
            <TouchableOpacity><Text>Login</Text></TouchableOpacity>
            <Text>Registre-se</Text>
        </SafeAreaView>
    )
}
