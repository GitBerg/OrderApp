import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    title:{
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10
    },
    card:{
        minHeight: "50%",
        justifyContent: "space-evenly"
    },
    description:{
        fontSize: 18,
        fontStyle: "italic"
    },
    input:{
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#f92e6a",
        paddingVertical: 10,
        fontSize: 18
    },
    passwordEye:{
        position: "absolute",
        right: 10,
    }
})

export default styles