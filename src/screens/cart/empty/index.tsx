import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import { getGuessGoods } from '../../../api';
import {GoodsType} from "../../../utils/interface";
import EmptyBox from "../../../components/EmptyBox";
import {transSaleCount} from "../../../utils";
import {useNavigation} from "@react-navigation/native";

function EmptyCart(props: {token: string}) {

  const [guessList, setGuessList] = useState<GoodsType[]>();
  const navigation = useNavigation();

  const toScreen = (id: number) => {
    // @ts-ignore
    navigation.navigate('Goods', {id});
  }

  useEffect(() => {
    getGuessGoods({num: 6}).then(res => {
      setGuessList(res.data.guessList);
    });
  }, []);

  return (
    <FlatList
      data={guessList}
      ListHeaderComponent={<EmptyBox type='cart' token={props.token}/>}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      renderItem={({item}) =>
        <View style={styles.guess} key={item.id} onTouchEnd={() => toScreen(item.id)}>
          <Image source={{uri: item.img}} style={styles.img} resizeMode='contain'/>
          <View style={styles.bottomBox}>
            <Text numberOfLines={2} ellipsizeMode='tail'>
              {item.name + ' ' + item.describe}
            </Text>
            <View style={styles.bottom}>
              <Text style={styles.price}>￥{item.price}</Text>
              <Text style={styles.saleCount}>已售{transSaleCount(item.sale_count)}件</Text>
            </View>
          </View>
        </View>
    }/>
  );
}

const styles = StyleSheet.create({
  guess: {
    width: '45%',
    margin: 10,
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: 195,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  bottomBox: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 5
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6565'
  },
  saleCount: {
    fontSize: 12,
    marginRight: 5
  }
})

export default EmptyCart;
