import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
        paddingHorizontal: 30,
        paddingBottom: 50
    },
    title:{
        fontSize: 23,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 30
    },
    description:{
        fontSize: 14,
        marginBottom: 10
    },
    input:{
        fontSize: 18,
        marginBottom: 10,
        borderWidth: 1,
        padding: 5,
        paddingLeft: 12,
        borderRadius: 4,
        borderColor: "#e5e5e5",
        backgroundColor: "#f5f5f5cf",
    },
    card:{
        borderColor: "#e5e5e5",
        borderWidth: 1,
        borderRadius: 4,
        width: "100%",
        backgroundColor: "#f5f5f5cf",
        marginBottom: 10,
        paddingHorizontal: 14,
        paddingVertical: 12
    },
    cardDescription:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
        alignItems: "center"
    },
    qtd:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    btns:{
        width:"30%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#f92e6a80",
        padding: 8,
        justifyContent: "space-between",
        borderRadius: 4

    },
    inputObservation:{
        fontSize: 18,
        borderWidth: 1,
        padding: 5,
        paddingLeft: 12,
        borderRadius: 4,
        backgroundColor: "#f5f5f5cf",
        borderColor: "#e5e5e5",
    },
    buttonUpdateOrder: {
        position: "relative",
        marginTop: 10,
        width: "40%",
        padding: 6,
        borderColor: "#f92e6a",
        borderWidth: 2,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"

    },
    iconButton:{
        color: "#fff",
        fontSize: 25,
        color: "#f92e6a",
    },
    footer:{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});

export default styles