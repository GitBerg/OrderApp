import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    kav:{
        flex: 1,
        backgroundColor: "#fff",
    },
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
    description:{
        fontSize: 18,
        marginBottom: 10,
        fontStyle: "italic",
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
        flex: 1,
        borderColor: "#e5e5e5",
        borderWidth: 1,
        borderRadius: 4,
        width: "100%",
        backgroundColor: "#f5f5f5cf",
        marginBottom: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
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
        flex:  1,
        maxWidth:"25%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#f92e6a80",
        padding: 8,
        justifyContent: "center",
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
        marginBottom: 10,
        maxHeight: 30
    },
    buttonDeleteOrder: {
        position: "relative",
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
    },
});

export default styles