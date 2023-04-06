import React, {useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Sae} from 'react-native-textinput-effects';
import FuncBox from "../../components/FuncBox";
import {login} from "../../api";
import {store} from "../../redux/store";
import {cartUpdateInfoAction, collectionUpdateAction, userLoginAction} from "../../redux/action";
import {useToast} from "react-native-fast-toast";
import ToastIcon from "../../components/ToastIcon";
import {useNavigation} from "@react-navigation/native";

function Login() {

  const [name, setName] = useState('');
  const [psw, setPsw] = useState('');
  const toast = useToast();
  const navigation = useNavigation();
  const bg = 'http://localhost:4000/assets/mobile/m_login/bg.jpg';
  const logo = 'http://localhost:4000/assets/home/app_logo.png';
  const header = 'http://localhost:4000/assets/mobile/m_login/';
  const inputAttr = {
    style: styles.input,
    labelHeight: 24,
    iconClass: FontAwesomeIcon,
    iconName: 'pencil',
    iconColor: '#D8ADEE',
    inputPadding: 16,
    inputStyle: {color: '#808080'},
    borderHeight: 2,
  }
  const data = [
    {id: 1, svg: `${header}qq1.svg`},
    {id: 2, svg: `${header}google.svg`},
    {id: 3, svg: `${header}bilibili.svg`},
    {id: 4, svg: `${header}wechat.svg`},
  ];

  const beforeLogin = async() => {
    if (name && psw){
      await login({name, password: psw, identity: 'customer', mobile: true}).then(res => {
        if (res.code === 200){
          store.dispatch(userLoginAction({...res.data}));
          store.dispatch(cartUpdateInfoAction({count: res.data.count.cartCount}));
          store.dispatch(collectionUpdateAction({collection: res.data.collection}));
          toast.show('登录成功!',
            {type: 'success', icon: <ToastIcon name='check'/>, animationType: 'zoom-in', placement: 'top'});
          // @ts-ignore
          navigation.navigate('我的');
        }else toast.show('登录失败!', {type: 'danger', icon: <ToastIcon name='remove'/>});
      }).catch(err => toast.show(err, {type: 'danger', icon: <ToastIcon name='remove'/>}));
    }else toast.show('请输入账户或者密码!', {type: 'warning'});
  }

  return (
    <ImageBackground
      source={{uri: bg}}
      imageStyle={{width: '100%', height: 300}}>
      <Image source={{uri: logo}} style={styles.logo}/>
      <View style={styles.loginForm}>
        <Sae {...inputAttr} label='用户名' value={name} onChangeText={(val) => setName(val)}/>
        <Sae
          {...inputAttr}
          label='密码'
          value={psw}
          textContentType='password'
          secureTextEntry={true}
          onChangeText={(val) => setPsw(val)}/>

        <TouchableOpacity activeOpacity={0.5} style={styles.submit} onPress={beforeLogin}>
          <Text style={{fontSize: 20, color: 'white'}}>登录 / 注册</Text>
        </TouchableOpacity>
        <Text style={styles.phoneWay}>使用手机号登录</Text>

        <View style={styles.otherWay}>
          <View style={{flexDirection: 'row', width: '90%'}}>
            <View style={styles.line}/>
            <Text style={styles.lineTitle}>其他登录注册方式</Text>
            <View style={styles.line}/>
          </View>
          <FuncBox data={data} columns={4} size={30}/>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '50%',
    alignSelf: 'center',
    height: 70,
    marginTop:35,
    marginBottom: 10
  },
  loginForm: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fffafa',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginTop: 10,
  },
  submit: {
    width: '80%',
    height: 50,
    backgroundColor: '#e55d7c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    margin: 12,
    marginTop: 30
  },
  phoneWay: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 30
  },
  otherWay: {
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  line: {
    flex: 1,
    borderBottomWidth: .5,
    borderBottomColor: '#e5e5e5',
    height: '50%'
  },
  lineTitle: {
    marginLeft: 10,
    marginRight: 10,
    color: '#929292'
  }
})

export default Login;
