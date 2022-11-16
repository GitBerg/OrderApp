import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        maxHeight: "87%",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    title:{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    storeName:{
        fontWeight:"bold",
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
        borderRadius: 14,
        marginBottom: 10
    },
    tag:{
        fontSize: 22,
        fontWeight:"bold",
        marginBottom: 10,
    },
    desc:{
        fontStyle: "italic",
        fontSize: 18,
        lineHeight: 25
    }
})

export default styles