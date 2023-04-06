import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Switch, Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {store} from "../../../../redux/store";
import {UserStateProps} from "../../../../utils/interface";
import {logout} from "../../../../api";
import {cartInitAction, collectionInitAction, userLogoutAction} from "../../../../redux/action";
import {useToast} from "react-native-fast-toast";
import ToastIcon from "../../../../components/ToastIcon";
import {useNavigation} from "@react-navigation/native";
import {saveCartInfo} from "../../../../utils";

function Setting() {

  const [user] = useState<UserStateProps>(store.getState().User);
  const [switchBtn, setSwitchBtn] = useState(true);
  const toast = useToast();
  const navigation = useNavigation();
  const func: {id: number, children: any}[] = [
    {
      id: 1, children: [
        {id: 1, left: <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{uri: user.imageUrl}} style={styles.avatar}/>
            <Text style={styles.userName}>{user.name}</Text>
          </View>, right: '编辑资料', callback: () => toScreen('Account')},
        {id: 2, left: '修改密码', callback: () => toScreen('ResetPsw')},
        {id: 3, left: '意见反馈'},
        {id: 4, left: '用户协议'},
      ]
    },
    {id: 2, children: [
        {id: 1, left: '检测更新', right: '当前版本1.0', isShowArrow: false, callback: () => 1},
        {id: 2, left: 'WIFI下自动升级客户端', right:
            <Switch value={switchBtn} onChange={() => setSwitchBtn(!switchBtn)}/>,
          isShowArrow: false, callback: () => 1},
      ]
    }
  ];

  const toScreen = (name: string) => {
    //@ts-ignore
    navigation.navigate(name);
  }
  const beforeLogout = async () => {
    try {
      await saveCartInfo();
      await logout().then(async res => {
        if (res.code === 200){
          store.dispatch(userLogoutAction());
          store.dispatch(cartInitAction());
          store.dispatch(collectionInitAction());
          toast.show(
            '欢迎下次光临!',
            {type: 'success', icon: <ToastIcon name='check'/>,
              animationType: 'zoom-in', placement: 'top'}
          );
          toScreen('我的');
        }
      })
    }catch (err: any){
      toast.show('操作异常!', {type: 'danger', icon: <ToastIcon name='remove'/>});
    }
  }

  return (
    <View style={styles.setting}>
      {
        func.map(data =>
          <View style={{...styles.box, marginTop: data.id === func.length ? 15 : 0}} key={data.id}>
            <FlatList data={data.children} renderItem={({item}) =>
              <View style={{...styles.body, borderBottomWidth: item.id === data.children.length ? 0 : 1}} onTouchStart={item.callback}>
                <Text style={styles.left}>{item.left}</Text>
                {item.right ? <Text style={styles.right}>{item.right}</Text> : <></>}
                {item.isShowArrow || item.isShowArrow !== false ? <AntDesign name='right' size={20} color='#878787'/> : <></>}
              </View>
            } keyExtractor={((item, index) => (item.id + index).toString())}/>
          </View>
        )
      }
      <TouchableOpacity activeOpacity={0.7} style={styles.logout} onPress={beforeLogout}>
        <Text style={{fontSize: 17, color: '#ec6a88'}}>退出当前账户</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  setting: {
    flex: 1,
    margin: 12,
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4'
  },
  left: {
    flex: 1,
    fontSize: 16
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: 'bold'
  },
  right: {
    color: '#878787',
    marginRight: 10,
    fontSize: 12
  },
  logout: {
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 15
  }
})

export default Setting;
