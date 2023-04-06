import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FuncBox from "../../components/FuncBox";
import {useNavigation} from "@react-navigation/native";
import {store} from "../../redux/store";
import {UserStateProps} from "../../utils/interface";

function User() {

  const [user, setUser] = useState<UserStateProps>(store.getState().User);
  const navigation = useNavigation();

  const toSvg = (name: string, size: number = 28) => <AntDesign name={name} size={size} style={{textAlign: 'center'}}/>;
  const funcCount = (title: number) => <Text style={styles.funcCount}>{title}</Text>;
  const toScreen = (name: string) => {
    // @ts-ignore
    navigation.navigate( user.token && name !== 'Login' ? name : 'Login');
  }

  const order = [
    {id: 1, title: '待付款', svg: toSvg('wallet')},
    {id: 2, title: '待收货', svg: toSvg('carryout')},
    {id: 3, title: '待评价', svg: toSvg('message1')},
  ];
  const func = [
    {id: 1, title: '优惠券', svg: funcCount(0)},
    {id: 2, title: '收藏夹', svg: funcCount(user.count?.collectionCount || 0), callback: () => toScreen('Collection')},
    {id: 3, title: '足迹', svg: funcCount(user.count?.historyCount || 0), callback: () => toScreen('History')},
  ];
  const other = [
    {id: 1, title: '权益卡', svg: toSvg('creditcard')},
    {id: 2, title: '生日纪念', svg: toSvg('clockcircleo')},
    {id: 3, title: '收货地址', svg: toSvg('enviromento')},
    {id: 4, title: '在线客服', svg: toSvg('customerservice')},
    {id: 5, title: '帮助中心', svg: toSvg('question')},
    {id: 6, title: '关于我们', svg: toSvg('smileo')},
    {id: 7, title: '设置', svg: toSvg('setting'), callback: () => toScreen('Setting')},
  ];

  useEffect(() => {
    store.subscribe(() => {
      setUser(store.getState().User);
    })
  }, [])

  return <View>
    <View style={styles.userInfo} onTouchStart={() => toScreen('Account')}>
      <Image source={{uri: user.token ? user.imageUrl : 'http://localhost:4000/assets/user/user.png'}} style={styles.avatar}/>
      {
        user.token ?
          <View style={styles.userData}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.score}>
              <AntDesign name='API' size={16}/>
              &nbsp;233
            </Text>
          </View>
          : <Text style={styles.loginText}>立即登录</Text>
      }
      <AntDesign name='right' size={30}/>
    </View>

    <View style={styles.box}>
      <View style={styles.orderHeader}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>我的订单</Text>
        <Text>
          全部订单
          <AntDesign name='right' size={16}/>
        </Text>
      </View>
      <FuncBox data={order} columns={3}/>
    </View>

    <View style={styles.box}>
      <FuncBox data={func} columns={3}/>
    </View>

    <View style={styles.box}>
      <FuncBox data={other} columns={4}/>
    </View>
  </View>
}

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 12,
  },
  avatar: {
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 10
  },
  loginText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b3b3b',
    marginLeft: 10
  },
  userData: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  name: {
    height: '100%',
    textAlignVertical: 'center',
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  score: {
    height: '100%',
    textAlignVertical: 'center',
    flexGrow: 1,
    marginLeft: 20,
    fontSize: 16,
  },
  box: {
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 10
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3'
  },
  funcCount: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2
  },
})

export default User;
