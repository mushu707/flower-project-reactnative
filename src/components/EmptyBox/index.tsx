import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {EmptyBoxProps} from "../../utils/interface";
import {SvgUri} from "react-native-svg";

function EmptyBox(props: EmptyBoxProps) {

  const item = [
    {title: '购物车内暂时没有商品', image: 'app_cart'},
    {title: '检测您尚未登录账户，请先进行登录', image: 'app_info'},
    {title: '抱歉，暂无该商品', image: 'app_search'},
  ];

  const toShow = () => {
    switch (props.type){
      case "cart":
        if (props.token) return item[0]
        else return item[1];
      case "list":
        return item[2];
    }
  }

  return (
    <View style={styles.empty}>
      <SvgUri uri={`http://localhost:4000/assets/mobile/m_empty/${toShow().image}.svg`} width={250} height={250}/>
      <Text style={styles.desc}>{toShow().title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    paddingBottom: 30
  },
  desc: {
    color: '#acacac',
    textAlign: 'center',
  }
})

export default EmptyBox;
