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
    },
    btns:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    btn: {
        position: "relative",
        width: "40%",
        paddingVertical: 15,
        borderColor: "#f92e6a",
        borderWidth: 2,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    viewExcludeBtn:{
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    },
    excludeBtn: {
        position: "relative",
        width: "40%",
        paddingVertical: 15,
        backgroundColor: "#f92e6a",
        borderColor: "#bababa",
        borderWidth: 2,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    error:{
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
    },
})

export default styles