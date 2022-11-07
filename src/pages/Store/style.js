import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
        padding: 20
    },
    title:{
        flexDirection: "row",
        alignItems: "center"
    },
    storeName:{
        marginLeft: 5,
        fontSize: 35
    },
    geral:{
        textAlign: "center",
        fontSize: 26,
        marginBottom: 14, 
    },
    infos:{
        paddingTop: 20,
        paddingLeft: 10,
        paddingBottom: 20,
        borderWidth: 1,
        borderColor: "#b5b5b5",
        borderRadius: 14
    },
    tag:{
        fontSize: 22,
        fontWeight:"bold",
        marginBottom: 10
    },
    desc:{
        fontSize: 18,
        lineHeight: 25
    }
})

export default styles