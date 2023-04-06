import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {GoodsType} from "../../../utils/interface";

function Info(props: {goods: GoodsType | undefined, label: object}) {

  const details:{id: number, title: string, target?: 'huayu' | 'material' | 'packing', text?: string}[] = [
    {id: 1, title: '花语', target: 'huayu'},
    {id: 2, title: '材料', target: 'material'},
    {id: 3, title: '包装', target: 'packing'},
    {id: 4, title: '配送', text: '全国配送，请提前一天预定'},
    {id: 5, title: '附送', text: '下单填写留言，即免费赠送精美贺卡！'},
  ];

  return (
    <>
      {details.map(item =>
        <View key={item.id} style={styles.boxInner}>
          <Text style={props.label}>{item.title}</Text>
          <Text
            numberOfLines={2}
            ellipsizeMode='tail'
            style={{flexShrink: 1}}>
            {item.target && props.goods ? props.goods[item.target!] : item.text}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  boxInner: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
})

export default Info;
