import {
  KeyboardAvoidingView,
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import firebase from "firebase";

import styles from "./style";
import { useEffect, useState } from "react";

export default function Register({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [store, setStore] = useState("");
  const [error, setError] = useState(false);
  const database =  firebase.firestore();

  const createUser = () => {
    if (email === "" || password === "" || store === "") {
      setError(true);
    } else {
        try{
            firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              let user = userCredential.user;
              navigation.navigate("Todos os Pedidos", { screen: "Pedidos", params:{userId: user.uid }})
              database.collection(user.uid).add({
                userId: user.uid,
                store: store,
                menu:[]
            })
            })
            .catch((error) => {
              let errorCode = error.code;
              let errorMessage = error.message;
            });
        }catch(err){
            console.log(err);
        }
      
    }
};


  useEffect(() => {
    setError(false);
    console.log(route);
  }, []);

  
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.slogan}>
        <Text style={styles.title}>Registrar</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.inputs}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        ></TextInput>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        ></TextInput>
        <Text style={styles.label}>Estabelecimento</Text>
        <TextInput
          placeholder="Nome"
          value={store}
          onChangeText={setStore}
          style={styles.input}
          keyboardType={"web-search"}
        ></TextInput>
      </KeyboardAvoidingView>
      <View style={error ? styles.error : [styles.error, { display: "none" }]}>
        <MaterialCommunityIcons
          name="alert-circle"
          size={23}
          color={"#b5b5b5"}
        />
        <Text>Todos os campos devem ser preenchidos</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btn} onPress={createUser}>
          <Text style={styles.btnTxt}>Criar</Text>
        </TouchableOpacity>
        <Text
          style={styles.login}
          onPress={() => navigation.navigate("Login")}
        >
          Fazer login
        </Text>
      </View>
    </SafeAreaView>
  );
}
