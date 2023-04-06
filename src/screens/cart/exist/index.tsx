import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View,
  DeviceEventEmitter, TouchableOpacity, ViewStyle} from "react-native";
import {deleteCart, getCartList} from "../../../api";
import {CartType} from "../../../utils/interface";
import CheckBox from "@react-native-community/checkbox";
import {store} from "../../../redux/store";
import {cartDeleteAction, cartUpdateInfoAction} from "../../../redux/action";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useToast} from "react-native-fast-toast";
import ToastIcon from "../../../components/ToastIcon";
import {format} from "../../../utils";

function ExistCart() {

  const [check, setCheck] = useState<number[]>(store.getState().Cart.check);
  const [sum, setSum] = useState<{total: number, count: number}>({total: 0, count: 0});
  const [cart, setCart] = useState<CartType[]>(store.getState().Cart.data);
  const toast = useToast();

  // 首、尾购物车样式
  const startAndEndStyle = (index: number): ViewStyle => {
    const topRadius = index === 0 ? 15 : 0;
    const bottomRadius = index === cart.length - 1 ? 15 : 0
    return {
      marginTop: index === 0 ? 10 : 0,
      marginBottom: index === cart?.length - 1 ? 70 : 0,
      borderTopLeftRadius: topRadius,
      borderTopRightRadius: topRadius,
      borderBottomLeftRadius: bottomRadius,
      borderBottomRightRadius: bottomRadius
    }
  }
  // 初始化选中状态
  const beforeSetChecked = (list: CartType[]) =>
    list.reduce((pre: number[], cur: CartType) => {
      if (cur.isChecked === 1)
        return [...pre, cur.id];
      else return [...pre];
    }, []);
  // 根据选中状态获取总数和总金额
  const getSum = (list: CartType[], tmpCheck?: number[]) => {
    /*
      tmpCheck代表中转check变量，存在则表示获取调用该方法时的（check），不存在则表示获取state的中的（check），
      用来处理setState的异步问题，例如用户登录后第一次进入cart页面，购物车存在商品但是总金额为0，这是因为调用该方法前的
      setState未执行完，state中的check为[]，而该函数已经把check拿来处理，所以总金额为0;
    */
    let total:number = 0, count:number = 0;
    const newCheck = tmpCheck ? tmpCheck : check;
    newCheck.forEach(val => {
      const data = list.find(item => item.id === val);
      if (data !== undefined){
        total += data.price * data.buy_count;
        count += data.buy_count;
      }
    })
    setSum({total, count});
    store.dispatch(cartUpdateInfoAction({data: list, check: newCheck}));
  }
  // 删除购物车
  const handleDelete = (delName: string) => {
    toast.show('正在删除...', {id: 'deleting'});
    setTimeout(() => {
      deleteCart({name: delName}).then(_ => {
        const newList = cart.filter(item => delName !== item.name);
        setCart(newList);
        getSum(newList);
        toast.hide('deleting');
        toast.show('删除成功 !', {icon: <ToastIcon name='check'/>, type: 'success'});
        store.dispatch(cartDeleteAction({list: newList}));
      })
    }, 400)
  }
  // 获取购物车列表信息
  const getCartListData = () => {
    getCartList().then(res => {
      const {cartList} = res.data;
      const check = beforeSetChecked(cartList);
      setCheck(check);
      setCart(cartList);
      getSum(cartList, check);
    })
  }
  // 改变选中状态
  const changeState = (val: boolean, item: CartType) => {
    item.isChecked = Number(val);
    let newCheck: number[];
    if (item.isChecked) newCheck = [...check, item.id];
    else newCheck = check.filter(id => id !== item.id)
    setCheck(newCheck);
    getSum(cart, newCheck);
  }

  useEffect(() => {
    getCartListData();
    DeviceEventEmitter.addListener('isGetData', () => getCartListData())
  }, [])

  return (
    <View style={styles.cartList}>
      <FlatList
        data={cart}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) =>
          <View style={[styles.cart, startAndEndStyle(index)]}>
            <CheckBox
              boxType='circle'
              value={Boolean(item.isChecked)}
              onValueChange={val => changeState(val, item)}
              tintColors={{true: '#e55e7c', false: 'rgba(229,94,124,0.3)'}}/>
            <Image source={{uri: item.img}} style={styles.img} resizeMode='cover'/>
            <View style={styles.info}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.infoName}>{item.name}</Text>
              <Text>添加时间 {format(item.create_time)}</Text>
              <View style={styles.infoBottom}>
                <Text style={styles.price}><Text style={{fontSize: 14}}>￥</Text>{item.price}</Text>
                <View style={styles.body}>
                  <TouchableWithoutFeedback onPress={() => {
                    if (item.buy_count !== 0) {
                      item.buy_count = item.buy_count - 1;
                      getSum(cart)
                    }
                  }}>
                    <FontAwesome name='minus' size={14}/>
                  </TouchableWithoutFeedback>
                  <TextInput
                    defaultValue={item.buy_count.toString()}
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={val => {item.buy_count = Number(val); getSum(cart)}}/>
                  <TouchableWithoutFeedback onPress={() => {item.buy_count = item.buy_count + 1; getSum(cart)}}>
                    <FontAwesome name='plus' size={14}/>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
            <FontAwesome name='remove' size={14} style={{alignSelf: 'flex-start'}} onPress={() => handleDelete(item.name)}/>
          </View>
        }/>
      <View style={styles.tab}>
        <Text style={styles.left}>
          合计: &nbsp;
          <Text style={styles.yun}>￥</Text>
          <Text style={styles.total}>{sum.total}</Text>
        </Text>
        <TouchableOpacity activeOpacity={.9}>
          <Text style={styles.right}>结算</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartList: {
    flex: 1,
    position: 'relative'
  },
  cart: {
    height: 120,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  img: {
    width: 100,
    height: 100,
    marginLeft: 10,
    borderRadius: 10,
  },
  info: {
    width: '100%',
    height: '100%',
    flexShrink: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  infoName: {
    fontSize: 16,
  },
  infoBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ec346f'
  },
  body: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#dbdbdb'
  },
  input: {
    width: 50,
    color: 'black',
    fontSize: 12,
    margin: 0,
    padding: 0,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  tab: {
    position: 'absolute',
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    height: 45,
    bottom: 0,
    left: 0,
    right: 0,
  },
  left: {
    alignSelf: 'center',
    textAlignVertical: 'center',
    height: '100%',
    flexGrow: 1,
    marginLeft: 10,
    paddingLeft: 20,
    fontSize: 14,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: 'rgba(255,255,255, .9)',
  },
  yun: {
    fontSize: 14,
    color: '#ec346f',
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ec346f',
  },
  right: {
    height: '100%',
    paddingVertical: 10,
    paddingHorizontal: 40,
    color: 'white',
    fontSize: 16,
    backgroundColor: '#ea497d',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginRight: 10
  }
})

export default ExistCart;
