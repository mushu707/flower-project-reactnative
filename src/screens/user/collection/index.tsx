import React, {useEffect, useState} from 'react';
import {
  DeviceEventEmitter,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from "react-native";
import {addCart, getCollection} from '../../../api';
import {CartType, CollectionType, GoodsType} from "../../../utils/interface";
import {store} from "../../../redux/store";
import {useNavigation} from "@react-navigation/native";
import { cartAddAction } from '../../../redux/action';
import {useToast} from "react-native-fast-toast";
import ToastIcon from "../../../components/ToastIcon";

function Collection() {

  const [collection, setCollection] = useState<CollectionType[]>([]);
  const [Cart] = useState(store.getState().Cart);
  const navigation = useNavigation();
  const toast = useToast();

  const toScreen = (id: number) => {
    // @ts-ignore
    navigation.navigate('Goods', {id});
  }
  const AddCart = async (g_info: GoodsType) => {
    const info = {
      name: g_info.name,
      img: g_info.img,
      price: g_info.price,
      original_price: g_info.original_price,
      buy_count: 1,
      isChecked: 1
    }
    await addCart(info).then(_ => {
      store.dispatch(cartAddAction());
      DeviceEventEmitter.emit('isGetData', true);
      toast.show('添加购物车成功 !', {type: 'success', icon: <ToastIcon name='check'/>});
    })
    // @ts-ignore
    navigation.navigate('购物车');
  }
  const getCollectionData = () => {
    getCollection().then(res => {
      setCollection(res.data.collectionData);
    })
  }

  useEffect(() => {
    getCollectionData();
    DeviceEventEmitter.addListener('getCollection', () => getCollectionData());
  }, [])

  return (
    <View style={styles.collection}>
      <FlatList
        data={collection}
        keyExtractor={(item => item.id.toString())}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) =>
          <View style={styles.colsItem} onStartShouldSetResponder={() => true} onTouchEndCapture={() => toScreen(item.g_id)}>
            <Image source={{uri: item.g_info.img}} style={styles.img}/>
            <View style={styles.itemBody}>
              <Text
                numberOfLines={2}
                ellipsizeMode='tail'
                style={styles.header}>
                {item.g_info.name + ' ' + item.g_info.describe}
              </Text>
              <View style={styles.footer}>
                <Text style={styles.price}>
                  <Text style={[styles.price, {fontSize: 16}]}>￥</Text>
                  {item.g_info.price}
                </Text>
                {
                  !Cart.data.find((data: CartType) => data.name === item.g_info.name)
                    ?
                    <View onTouchEndCapture={() => AddCart(item.g_info)}>
                      <TouchableOpacity style={styles.addCartBtn} activeOpacity={.7}>
                        <ToastIcon name='shopping-cart'/>
                        <Text style={styles.addCartText}> 加入购物车</Text>
                      </TouchableOpacity>
                    </View>

                    : <View style={[styles.addCartBtn, {backgroundColor: 'rgba(227,73,126,0.45)'}]}>
                      <ToastIcon name='check'/>
                      <Text style={styles.addCartText}> 已添加购物车</Text>
                    </View>
                }
              </View>
            </View>
          </View>
        }/>
    </View>
  );
}

const styles = StyleSheet.create({
  collection: {
    justifyContent: 'center',
    margin: 12,
  },
  colsItem: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  img: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  itemBody: {
    flexShrink: 1,
    height: '100%',
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  header: {
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  price: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e3497e'
  },
  addCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#e3497e',
    borderRadius: 15,
  },
  addCartText: {
    color: 'white'
  },
})

export default Collection;
