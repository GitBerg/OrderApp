import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
        paddingHorizontal: 30,
        paddingBottom: 100
    },
    title:{
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10
    },
    list:{
        maxHeight:"90%"
    },
    card:{
        flex: 1,
        width: "100%",
        borderWidth: 1,
        borderColor: "#e5e5e5",
        borderRadius: 4,
        padding: 10,
        marginBottom: 10
    },
    description:{
        fontSize: 14,
        marginBottom: 5,
    },
    nameInput:{
        fontSize: 18,
        marginBottom: 5,
        borderBottomWidth: 1,
        paddingLeft: 12,
        borderRadius: 4,
        paddingBottom: 5
    },
    priceInput:{
        fontSize: 18,
        marginBottom: 5,
        borderBottomWidth: 1,
        width: "20%",
        textAlign: "center",
        borderRadius: 4,
    },
    priceAndClose:{
        flexDirection: "row",
        justifyContent: "space-between"
    },
    btnAddProduct:{
        position: "absolute",
        top: 15,
        right: 25,
        backgroundColor: "#fff",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    popUp:{
        backgroundColor: "#fff",
        width: "90%",
        borderWidth: 1,
        position: "absolute",
        top: 260,
        left: "13%",
        padding: 20,
    }

});

export default styles