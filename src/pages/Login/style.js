import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    error:{
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    slogan:{
        flexDirection: "row",
        alignItems: "center",

    },
    title:{
        fontSize: 40,
        fontWeight: "bold",
        color: "#f92e6a"
    },
    inputs:{
        marginTop:20,
       width: "70%"
    },
    label:{
        fontSize: 18
    },
    input:{
        borderBottomWidth: 1,
        borderBottomColor: "#f92e6a",
        padding: 8,
        marginBottom: 20
    },
    buttons:{
        width: "70%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    btn:{
        backgroundColor: "#f92e6a",
        paddingHorizontal: 34,
        paddingVertical: 12,
    },
    btnTxt:{
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    },
    register:{
        color: "blue",
        fontSize: 16,
        padding: 20,
    }
})

export default styles