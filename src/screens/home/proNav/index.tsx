import React from 'react';
import FuncBox from "../../../components/FuncBox";
import {StyleSheet, View} from "react-native";

function ProNav() {

  const header = 'http://localhost:4000/assets/mobile/m_home/';

  const data = [
    {id: 1, title: '鲜花', svg: `${header}花店-百合.svg`},
    {id: 2, title: '永生花', svg: `${header}花店-永生花.svg`},
    {id: 3, title: '蛋糕', svg: `${header}蛋糕.svg`},
    {id: 4, title: '礼品', svg: `${header}礼物.svg`},
    {id: 5, title: '装饰', svg: `${header}婚庆.svg`},
    {id: 6, title: '生日祝福', svg: `${header}干杯.svg`},
    {id: 7, title: '表白求婚', svg: `${header}钻戒.svg`},
    {id: 8, title: '商务开业', svg: `${header}欢庆.svg`},
    {id: 9, title: '周年纪念', svg: `${header}婚礼日期.svg`},
    {id: 10, title: '专业摄影', svg: `${header}摄像.svg`},
  ];

  return (
    <View style={styles.proNav}>
      <FuncBox
        data={data}
        columns={5}
        size={50}
        titleStyle={{fontWeight: 'bold', color: '#4e4e4e'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  proNav: {
    backgroundColor: 'white',
    margin: 12,
    paddingBottom: 25,
    borderRadius: 10
  }
})

export default ProNav;
