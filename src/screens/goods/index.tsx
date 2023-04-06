import React, {useEffect, useState} from 'react';
import {Image, Route, ScrollView, StyleSheet, Text, TouchableOpacity, View, DeviceEventEmitter } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {addCart, addCollection, addHistory, deleteCollection, getDetailInfo, getHistory, login} from "../../api";
import {CartType, GoodsType, HistoryType} from "../../utils/interface";
import {transSaleCount} from "../../utils";
import Location from "./location";
import Info from "./info";
import Comment from "./comment";
import {store} from "../../redux/store";
import {
  cartAddAction,
  collectionAddAction,
  collectionDeleteAction,
  userCollectionAddAction, userCollectionDeleteAction, userHistoryAddAction,
} from "../../redux/action";
import {useToast} from "react-native-fast-toast";
import ToastIcon from "../../components/ToastIcon";

function Goods({route}: Route) {

  const [goods, setGoods] = useState<GoodsType>();
  const [isCollect, setIsCollect] = useState<boolean | number>(false);
  const toast = useToast();

  const AddCart = () => {
    const {Cart, User} = store.getState();
    if (User.token && !Cart.data.find((item: CartType) => item.name === goods!.name)) {
      const info = {
        name: goods?.name,
        img: goods?.img,
        price: goods?.price,
        original_price: goods?.original_price,
        buy_count: 1,
        isChecked: 1
      }
      addCart(info).then(res => {
        if (res.code === 200){
          store.dispatch(cartAddAction());
          toast.show('添加购物车成功!', {icon: <ToastIcon name='check'/>, type: 'success'});
          DeviceEventEmitter.emit('isGetData', true);
        }
      })
    } else toast.show(
      `${User.token ? '购物车中已存在该商品!' : '请先登录账户 !'}`,
      {icon: <ToastIcon name='warning'/>, type: 'warning'});
  }
  const AddCollection = () => {
    const {User} = store.getState();
    if (User.token)
      addCollection({g_id: goods!.id}).then(res => {
        if (res.code === 200){
          store.dispatch(collectionAddAction(goods!.id));
          store.dispatch(userCollectionAddAction());
          toast.show('添加收藏成功 !', {type: 'success', icon: <ToastIcon name='check'/>});
          setIsCollect(true);
        }
        else toast.show('该商品已存在收藏夹中 !', {type: 'warning', icon: <ToastIcon name='triangleExclaim'/>});
      })
    else toast.show('请先登录账户', {icon: <ToastIcon name='remove'/>})
  }
  const CancelCollected = () => {
    deleteCollection({g_id: goods!.id}).then(res => {
      if (res.code === 200){
        store.dispatch(collectionDeleteAction(goods!.id));
        store.dispatch(userCollectionDeleteAction());
        setIsCollect(0);
        DeviceEventEmitter.emit('getCollection', true);
        toast.show('取消收藏成功 !', {type: 'success', icon: <ToastIcon name='check'/>});
      }else toast.show(res.message, {type: 'warning', icon: <ToastIcon name='triangleExclaim'/>});
    })
  }

  useEffect(() => {
    getDetailInfo({hua_id: route.params.id}).then(res => {
      if (res.code === 200) setGoods(res.data.goodsInfo);
    })
    if (store.getState().User.token) getHistory().then(res => {
      if (res.data.history.length === 0 || (res.data.history.find((item: HistoryType) => item.g_id === route.params.id) ? false : true)){
        addHistory({g_id: route.params.id});
        store.dispatch(userHistoryAddAction());
      }
    })
  }, [])

  return (
    <>
      <ScrollView>
        <View style={styles.goods}>
          <Image source={{uri: goods?.img}} style={styles.img} resizeMode='cover'/>
          <View style={styles.titleBody}>
            <View style={styles.container}>
              <View style={{flex: 1}}>
                <Text style={styles.name}>{goods?.name}</Text>
                <Text style={styles.desc}>{goods?.describe}</Text>
              </View>
              {
                store.getState().Collection.collection.includes(goods?.id) || isCollect
                  ? <FontAwesome style={styles.colBtn} name='star' size={24} onPress={CancelCollected} color={'rgb(236,139,170)'}/>
                  : <FontAwesome style={styles.colBtn} name='star-o' size={24} onPress={AddCollection}/>
              }
            </View>
            <View style={{...styles.container, paddingBottom: 12}}>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={styles.price}><Text style={{fontSize: 16, fontWeight: "bold"}}>￥</Text>{goods?.price}</Text>
                <Text style={styles.originalPrice}>￥{goods?.original_price}</Text>
                <Text style={styles.tag}>APP专享</Text>
              </View>
              <Text>已售{transSaleCount(goods?.sale_count!)}件</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Location label={styles.label}/>
          </View>
          <View style={[styles.box, {flexDirection: 'column', marginBottom: 10}]}>
            <Info goods={goods} label={styles.label}/>
          </View>

          <View style={[styles.box, {marginBottom: 15}]}>
            <Comment/>
          </View>
        </View>
      </ScrollView>
      <View style={styles.tab}>
        <AntDesign name='customerservice' size={24}/>
        <Ionicons name='cart-outline' size={24}/>
        <TouchableOpacity activeOpacity={.7} style={[styles.button, {backgroundColor: '#93d5dc'}]} onPress={AddCart}>
          <Text style={[styles.btnTitle]}>加入购物车</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.7} style={[styles.button, {backgroundColor: '#ee3f4d'}]}>
          <Text style={[styles.btnTitle]}>立即购买</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  goods: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: 420
  },
  titleBody: {
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 12,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#474747'
  },
  desc: {
    fontSize: 15,
    color: '#878787'
  },
  colBtn: {
    marginLeft: 10,
    marginRight: 5
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e3497e',
    paddingRight: 10
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    marginRight: 10,
    marginBottom: 4,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#e3497e',
    borderRadius: 3,
    backgroundColor: 'rgba(227,73,126,0.1)',
    color: '#e3497e',
    textAlign: 'center',
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginBottom: 5,
    fontSize: 12,
  },
  box: {
    alignItems: 'baseline',
    marginHorizontal: 12,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  label: {
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#6c6c6c',
  },
  tab: {
    height: 50,
    width: '100%',
    elevation: 999,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width:  120,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  btnTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default Goods;
