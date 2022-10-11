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
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 30
    },
    description:{
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    input:{
        fontSize: 18,
        marginBottom: 10,
        borderWidth: 1,
        padding: 5,
        paddingLeft: 12,
        borderRadius: 4
    },
});

export default styles