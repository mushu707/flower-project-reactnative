import React, {useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ColorfulTabBar} from "react-navigation-tabbar-collection";
import {store} from "../redux/store";
import {DeviceEventEmitter, Text, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../screens/home";
import Cart from "../screens/cart";
import User from "../screens/user";
import Login from "../screens/login";
import Setting from "../screens/user/setting/main";
import Category from "../screens/category";
import Account from "../screens/user/setting/account";
import ResetPsw from "../screens/user/setting/resetPsw";
import Goods from "../screens/goods";
import Collection from "../screens/user/collection";
import History from "../screens/user/history";
import Search from "../screens/search";

function HomeTabScreen(){

  const HomeTab = createBottomTabNavigator();
  const [count, setCount] = useState<number>(store.getState().User.cartCount);

  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed)
      store.subscribe(() => {
        setCount(store.getState().Cart.count);
      })
    return () => {
      isApiSubscribed = false;
    }
  }, [])

  return (
    <HomeTab.Navigator tabBar={(props => {
      // @ts-ignore
      return <ColorfulTabBar {...props} maxWidth='90%'/>
    })} screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string = '';
        if (route.name === '主页') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === '分类') iconName = focused ? 'list' : 'list-outline';
        else if (route.name === '购物车') iconName = focused ? 'cart' : 'cart-outline';
        else if (route.name === '我的') iconName = focused ? 'person' : 'person-outline';
        return <View style={{flexDirection: 'row'}}>
          <Ionicons name={iconName} size={size} color={color}/>
          {
            route.name === '购物车' && count !== 0 &&
            <View style={{backgroundColor: focused ? 'white' : '#e55e7c', borderRadius: 20,
              width: 15, height: 15, justifyContent: 'center',
              alignItems: 'center', position: 'absolute', left: 20, top: -5}}>
              <Text style={{fontSize: 11, color: focused ? 'red' : 'white'}}>{count}</Text>
            </View>
          }
        </View>;
      },
      tabBarAllowFontScaling: true,
      tabBarActiveTintColor: '#e8486c',
      tabBarLabelStyle: {fontSize: 16},
    })} sceneContainerStyle={{backgroundColor: 'rgba(255,255,255,.4)'}}>
      <HomeTab.Screen name='主页' component={Home}/>
      <HomeTab.Screen name='分类' component={Category}/>
      <HomeTab.Screen name='购物车' component={Cart}/>
      <HomeTab.Screen name='我的' component={User}/>
    </HomeTab.Navigator>
  )
}

function IndexNavigation() {

  const [isEdit, setIsEdit] = useState(false);
  const Stack = createNativeStackNavigator();

  const changeEdit = () => {
    DeviceEventEmitter.emit('edit', !isEdit);
    setIsEdit(!isEdit);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='HomeTab' component={HomeTabScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Goods' component={Goods} options={{title: '', headerTransparent: true}}/>
        <Stack.Screen name='Search' component={Search} options={{title: '搜索结果', headerTitleAlign: 'center'}}/>
        <Stack.Screen name='Login' component={Login} options={{title: '', headerTransparent: true}}/>
        <Stack.Screen name='Setting' component={Setting} options={{title: '设置', headerTitleAlign: 'center'}}/>
        <Stack.Screen name='Collection' component={Collection} options={{title: '商品收藏夹', headerTitleAlign: 'center'}}/>
        <Stack.Screen
          name='History'
          component={History}
          options={{
            title: '足迹',
            headerTitleAlign: 'center',
            headerRight: () =>
              <Text onPress={changeEdit}>{isEdit ? '完成' : '编辑'}</Text>
          }}/>
        <Stack.Screen name='Account' component={Account} options={{title: '个人资料', headerTitleAlign: 'center'}}/>
        <Stack.Screen name='ResetPsw' component={ResetPsw} options={{title: '重置密码', headerTitleAlign: 'center'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default IndexNavigation;
