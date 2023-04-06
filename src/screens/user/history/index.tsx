import React, {useEffect, useRef, useState} from 'react';
import {DeviceEventEmitter, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle, Animated} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import {HistoryType} from "../../../utils/interface";
import {deleteHistory, getHistory} from "../../../api";
import {dateResort, formatTimestampToDay} from "../../../utils";
import {useToast} from "react-native-fast-toast";
import ToastIcon from "../../../components/ToastIcon";
import {useNavigation} from "@react-navigation/native";
import {store} from "../../../redux/store";
import {userHistoryDeleteAction} from "../../../redux/action";

function History() {

  const [history, setHistory] = useState<{date: string, data: HistoryType[]}[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState<number[]>([]);
  const delBtn = useRef(new Animated.Value(140)).current;
  const checkBtn = useRef(new Animated.Value(0)).current;
  const toast = useToast();
  const navigation = useNavigation();

  const getHistoryData = () => {
    getHistory().then(res => setHistory(dateResort(res.data.history)));
  }
  const beforeDeleteHistory = () => {
    if (value.length){
      deleteHistory(value).then(res => {
        if (res.code === 200) {
          getHistoryData();
          store.dispatch(userHistoryDeleteAction(value.length));
          toast.show('删除成功!', {type: 'success', icon: <ToastIcon name='check'/>});
        }
        else toast.show(res.message, {type: 'warning', icon: <ToastIcon name='exclamation-triangle'/>});
      }).catch(err => toast.show(err, {type: 'danger', icon: <ToastIcon name='remove'/>}));
    }
  }
  const borderStyle = (item: HistoryType[], index: number): ViewStyle => {
    const top = index === 0 ? 10 : 0;
    const bottom = index === item.length - 1 ? 10 : 0;
    return {
      borderTopLeftRadius: top,
      borderTopRightRadius: top,
      borderBottomLeftRadius: bottom,
      borderBottomRightRadius: bottom,
      marginBottom: bottom
    }
  }
  const toScreen = (id: number) => {
    // @ts-ignore
    navigation.navigate('Goods', {id})
  }
  const showDelBtn = () => {
    Animated.spring(delBtn, {
      toValue: 0,
      useNativeDriver: true
    }).start();
    Animated.timing(checkBtn, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }
  const hideDelBtn = () => {
    Animated.spring(delBtn, {
      toValue: 140,
      useNativeDriver: true,
    }).start();
    Animated.timing(checkBtn, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  }

  useEffect(() => {
    getHistoryData();
    DeviceEventEmitter.addListener('edit', params => {
      setIsEdit(params);
      if (params) showDelBtn();
      else hideDelBtn();
    })
  }, [])

  return (
    history.length ? <View style={styles.history}>
      <FlatList
        data={history}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item => item.date)}
        renderItem={({item}) =>
          <>
            <Text style={styles.date}>{formatTimestampToDay(item.date)}</Text>
            {
              item.data.map((data, index) =>
                <View style={[styles.item, borderStyle(item.data, index)]} key={data.g_id}>
                  <Animated.View style={{transform: [{scaleX: checkBtn}]}}>
                    <CheckBox
                      style={{marginRight: 5, display: isEdit ? 'flex' : 'none'}}
                      tintColors={{true: '#e55e7c', false: 'rgba(229,94,124,0.3)'}}
                      value={value.includes(data.g_id) ? true : false}
                      onValueChange={(val) => val
                        ? setValue([...value, data.g_id])
                        : setValue(value.filter(i => i !== data.g_id))}
                    />
                  </Animated.View>
                  <View onTouchEnd={() => toScreen(data.g_id)}>
                    <Image style={styles.img} source={{uri: data.g_info.img}}/>
                  </View>
                  <View style={styles.itemBody} onTouchEnd={() => toScreen(data.g_id)}>
                    <Text style={styles.title}>{data.g_info.name}</Text>
                    <Text style={styles.desc} numberOfLines={2} ellipsizeMode='tail'>{data.g_info.material}</Text>
                    <Text style={styles.price}>
                      <Text style={{fontSize: 14}}>￥</Text>
                      {data.g_info.price}
                    </Text>
                  </View>
                </View>
              )
            }
          </>
        }/>
      <Animated.View style={{transform: [{translateX: delBtn,}], position: 'absolute', right: 0, bottom: 0}}>
        <TouchableOpacity activeOpacity={.8} style={styles.delBtn} onPressOut={beforeDeleteHistory}>
          <Text style={styles.delBtnText}>删除</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
      : <View></View>
  );
}

const styles = StyleSheet.create({
  history: {
    margin: 12,
    justifyContent: 'center',
  },
  date: {
    fontSize: 16,
    paddingBottom: 10,
    marginLeft: 10,
  },
  item: {
    height: 140,
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 10
  },
  itemBody: {
    height: '100%',
    flexShrink: 1,
    justifyContent: 'space-between',
    paddingVertical: 5,
    marginLeft: 10
  },
  title: {
    fontSize: 18,
  },
  desc: {
    fontSize: 14,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e3497e'
  },
  delBtn: {
    width: 120,
    borderRadius: 15,
    backgroundColor: '#e3497e',
    paddingVertical: 10,
    textAlign: 'center',
  },
  delBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

export default History;
