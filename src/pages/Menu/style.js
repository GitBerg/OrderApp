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
    card:{
        flex: 1,
        width: "100%",
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        marginBottom: 10
    },
    description:{
        fontSize: 18,
        marginBottom: 5,
    },
    nameInput:{
        fontSize: 18,
        marginBottom: 10,
        borderWidth: 1,
        padding: 5,
        paddingLeft: 12,
        borderRadius: 4,
        borderColor: "#e5e5e5",
        backgroundColor: "#f5f5f5cf",
    },
    priceInput:{
        
    },

});

export default styles