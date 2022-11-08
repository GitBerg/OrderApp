import { View, Text, TouchableOpacity } from "react-native";

import firebase from "firebase";

export default function Settings({navigation}){

    
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            navigation.navigate("Login")
          }).catch((error) => {
            console.log(error);
          });
    }

    return(
        <View>
            <Text>Settings Page</Text>
            <TouchableOpacity onPress={signOut}><Text>Sair</Text></TouchableOpacity>
        </View>
    )
}