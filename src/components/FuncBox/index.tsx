import React from 'react';
import {FlatList, StyleSheet, Text, View, Image} from "react-native";
import {SvgUri} from "react-native-svg";
import {FuncProps} from "../../utils/interface";
import {useNavigation} from "@react-navigation/native";

function FuncBox(props: FuncProps) {

  const navigation = useNavigation();

  const toSearch = (key: string, style: string) => {
    // @ts-ignore
    navigation.navigate('Search', {key, style});
  }

  const styles = StyleSheet.create({
    itemList: {
      marginTop: 10,
      marginBottom: 10,
    },
    itemBody: {
      marginTop: 12,
      marginBottom: 12,
      flexBasis: (1 / props.columns) * 100 + '%',
      flexDirection: 'column',
      width: props.size,
      height: props.size
    },
    title: {
      textAlign: 'center',
      marginTop: 5,
    }
  })

  return (
    <FlatList
      data={props.data}
      style={props.style ? props.style : styles.itemList}
      renderItem={({item}) => (
        <View style={styles.itemBody} onTouchStart={props.cbType ? () => toSearch(item.title!, item.style!) : item.callback}>
          {item.svg && typeof item.svg === 'string'
            ? <SvgUri uri={item.svg} width='100%' height='100%'/>
            : item.icon
              ? <Image source={{uri: item.icon}} style={{width: 60, height: 60, alignSelf: 'center'}}></Image>
              : item.svg
          }
          <Text style={props.titleStyle ? {...Object.assign(props.titleStyle, styles.title) as {}} : styles.title}>{item.title}</Text>
        </View>
      )}
      keyExtractor={((item) => item.id.toString())}
      numColumns={props.columns}/>
  );
}

export default FuncBox;
