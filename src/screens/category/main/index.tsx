import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import {CategoryType} from "../../../utils/interface";
import FuncBox from "../../../components/FuncBox";

function Main(props: {category: CategoryType[]}) {

  const [active, setActive] = useState(1);

  return (
    <View style={styles.category}>
      <View style={styles.sideBar}>
        {
          props.category.map(item =>
            <Text
              key={item.id}
              style={[styles.bar, item.id === active && styles.activeBar]}
              onPress={() => setActive(item.id)}>{item.name}</Text>
          )
        }
      </View>
      <View style={styles.body}>
        <FlatList
          data={props.category.filter(item => item.id === active)[0].categories}
          keyExtractor={(item => item.id.toString())}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Image style={styles.img} source={{uri: props.category.filter(item => item.id === active)[0].m_img}}/>}
          renderItem={({item}) =>
            <View style={styles.bodyItem}>
              <Text style={styles.tagTitle}>{item.name.split('_')[1]}</Text>
              <FuncBox data={item.tags} columns={3} style={{marginTop: 0}} cbType='onClickSearch'/>
            </View>
          }/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    height: '100%',
    flexGrow: 1,
    flexDirection: 'row',
    paddingBottom: 70,
  },
  sideBar: {
    flex: 2.5,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRightWidth: 2,
    borderColor: '#f3f3f3'
  },
  bar: {
    width: '100%',
    paddingVertical: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  activeBar: {
    borderLeftWidth: 3,
    borderLeftColor: 'rgba(227,73,126,0.7)',
    color: '#e3497e',
  },
  body: {
    flex: 7.5,
    backgroundColor: 'white',
    padding: 10,
  },
  img: {
    width: '100%',
    height: 120
  },
  bodyItem: {
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f3f3f3'
  },
  tagTitle: {
    paddingTop: 10,
    paddingLeft: 12,
  }
})

export default Main;
