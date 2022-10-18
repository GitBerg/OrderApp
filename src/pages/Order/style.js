import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20
    },
    pageName: {
        fontSize: 40,
        fontWeight: "bold",
        marginLeft: 30,
        marginTop: 10,
        marginBottom: 30
    },
    listOrders:{
        maxHeight: "72%",
    },
    Orders:{
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    deleteOrder: {
        justifyContent: "center",
        paddingRight: 20
    },
    finishOrder: {
        justifyContent: "center",
        paddingLeft: 20
    },
    descriptionOrder:{
        width: "75%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5cf",
        alignItems: "center",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginBottom: 5,
        color: "#282b2db5",
    },
    descriptionOrderWarner:{
        width: "75%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5cf",
        alignItems: "center",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginBottom: 5,
        color: "#282b2db5",
        borderWidth: 2, 
        borderColor:"#f92e6a80"
    },
    buttonNewOrder:{
        width: 50,
        height: 50,
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: "#f92e6a",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"

    },
    buttonMenu:{
        position: "absolute",
        bottom: 50,
        right: 150,
        padding: 10,
        backgroundColor: "#f92e6a",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"

    },
    iconButton:{
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold"
    }
});

export default styles