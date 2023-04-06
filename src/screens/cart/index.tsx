import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import {store} from "../../redux/store";
import ExistCart from "./exist";
import EmptyCart from "./empty";
import Ionicons from "react-native-vector-icons/Ionicons";

function Cart() {

  const [info, setInfo] = useState<{token: string, cartCount: number}>(
    {token: store.getState().User.token, cartCount: store.getState().Cart.count}
  );

  useEffect(() => {
    store.subscribe(() => {
      setInfo({token: store.getState().User.token, cartCount: store.getState().Cart.count,});
    })
  }, [])

  return (
    <View style={styles.cart}>
      <View style={styles.nav}>
        <Text style={styles.title}>购物车</Text>
        <Text style={styles.location}><Ionicons name='location-outline' size={16}/> 广州</Text>
      </View>
      {
        info.token && info.cartCount ? <ExistCart/>
          : <EmptyCart token={info.token}/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  cart: {
    flex: 1,
    margin: 10,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    top: 0,
    elevation: 999,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  location: {
    fontSize: 16,
    marginLeft: 10
  }
})

export default Cart;
