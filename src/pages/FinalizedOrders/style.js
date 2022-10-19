import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20
    },
    pageName: {
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: 30,
        marginTop: 10,
        marginBottom: 30
    },
    listOrders:{
        maxHeight: "72%",
        paddingHorizontal: 20
    },
    Orders:{
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    descriptionOrder:{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#ccc",
        alignItems: "center",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginBottom: 5,
        color: "#282b2db5",
    },
    descriptionOrderWarner:{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#ccc",
        alignItems: "center",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginBottom: 5,
        color: "#282b2db5",
        borderWidth: 2, 
        borderColor:"#f92e6a80"
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
    },
    footer:{
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        width: "100%",
        height:90,
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: "#f92e6a55",
    }
});

export default styles