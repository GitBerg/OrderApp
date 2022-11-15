import { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./style";

import firebase from "../../config/firebaseConfig";

export default function Store({ navigation }) {
  const database = firebase.firestore();
  const [store, setStore] = useState({});
  const [finishedOrders, setFinishedOrders] = useState([]);
  const userId = navigation.getState().routes[0].params.userId;
  const [mostSaled, setMostSaled] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    try {
      database.collection(userId).onSnapshot((query) => {
        query.forEach((el) => {
          const value = el.data();
          database
            .collection("Orders")
            .where("userId", "==", userId)
            .onSnapshot((query) => {
              const finalizedOrders = [];
              let allQtds = {}
              query.forEach((element) => {
                if (element.data().finalizado === true){
                  finalizedOrders.push({ ...element.data(), id: element.id });
                 totalSalesAmount(element.data().products, allQtds)
                  mostSalesAmount(allQtds)
                  setFinishedOrders(finalizedOrders);
                }
              });
              
            });
          setStore(value);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const totalSalesAmount = (array, allQtds) =>{
    try {
      array.forEach(el => {
          if(el.name in allQtds){
            allQtds[el.name] += el.qtd
          }else{
            allQtds[el.name] = el.qtd
          }
      })  
    } catch (error) {
      console.log(error);
    }
 
  }

  const mostSalesAmount = (object) =>{
    try {
      let mostSaledName = ""
      let mostSaledQtd = 0
      Object.keys(object).forEach(item =>{
        if(object[item] > mostSaledQtd){
          mostSaledQtd = object[item]
          mostSaledName = item
        }
      })
     setMostSaled({name: mostSaledName, qtd:mostSaledQtd})
    } catch (error) {
      console.log(error);
    }
 
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <MaterialCommunityIcons
          name="storefront"
          size={120}
          color={"#f92e6a"}
        />
        <Text style={styles.storeName}>{store.store}</Text>
      </View>
      <Text style={styles.geral}>Visão Geral</Text>
      <View style={styles.infos}>
        <Text style={styles.tag}>Faturado</Text>
        <Text style={styles.desc}>Total: R$</Text>
        <Text style={styles.desc}>Hoje: R$</Text>
      </View>
      <View style={styles.infos}>
        <Text style={styles.tag}>Pedidos</Text>
        <Text style={styles.desc}>Finalizados: {finishedOrders.length}</Text>
        <Text style={styles.desc}>
          Com observações:{" "}
          {finishedOrders.filter((el) => (el.observacoes ? el : false)).length}
        </Text>
        <Text style={styles.desc}>
          Hoje:{" "}
          {
            finishedOrders.filter((el) => {
              const data = new Date(
                el.date.seconds * 1000 + el.date.nanoseconds / 1000000
              );
              const day = data.getDate();
              const currentDay = new Date().getDate();
              return day === currentDay;
            }).length
          }
        </Text>
      </View>
      <View style={styles.infos}>
        <Text style={styles.tag}>Produto Mais Vedido</Text>
          <Text style={styles.desc}>Nome: {mostSaled.name}</Text>
          <Text style={styles.desc}>Quantidade: {mostSaled.qtd}</Text>
      </View>
    </ScrollView>
  );
}
