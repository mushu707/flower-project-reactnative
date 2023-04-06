import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {GoodsType} from "../../utils/interface";
import {transSaleCounts} from "../../utils";
// @ts-ignore
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function GoodsBox(props: {data: GoodsType}) {

  const navigation = useNavigation();

  return (
    <View style={styles.goodsItem} key={props.data.id} onTouchEnd={() => {
      // @ts-ignore
      navigation.navigate('Goods', {id: props.data.id});
    }}>
      <View style={styles.itemLeft}>
        <Image
          source={{uri: props.data.img}}
          style={styles.itemImg} resizeMethod='resize'/>
      </View>
      <View style={styles.itemRight}>
        <View style={styles.rightBody}>
          <Text style={styles.bodyTitle}>{props.data.name}</Text>
          <Text style={styles.bodyDesc} numberOfLines={2}>{props.data.describe}</Text>
          <Text style={styles.bodySlogan}>{props.data.slogan}</Text>
          <View style={styles.descPriceBox}>
            <View style={styles.boxLeft}>
              <Text style={styles.bodyPrice}>￥{props.data.price}</Text>
              <Text style={styles.bodySaleCount}>已销售{transSaleCounts(props.data.sale_count)}件</Text>
            </View>
            <View style={styles.boxRight}>
              <MaterialCommunityIcons name='cart-heart' size={24} style={styles.bodyIcon}/>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  goodsItem: {
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 15
  },
  itemLeft: {
    flex: 1,
    height: 200,
  },
  itemImg: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  itemRight: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  rightBody: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 10,
    height: 200
  },
  bodyTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#505050'
  },
  bodyDesc: {
    flex: 1,
  },
  bodySlogan: {
    flex: 0,
    fontSize: 12,
    color: '#e8486c',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopColor: '#f1f1f1',
    borderBottomColor: '#f1f1f1',
  },
  descPriceBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  boxLeft: {
    flex: 4,
  },
  bodyPrice: {
    flex: 1,
    color: '#e52f57',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5
  },
  bodySaleCount: {
    flex: 1,
    fontSize: 13
  },
  boxRight: {
    flex: 1,
    justifyContent: 'center',
  },
  bodyIcon: {
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    backgroundColor: 'rgba(229,47,87,0.75)',
    borderRadius: 15
  }
})

export default GoodsBox;
