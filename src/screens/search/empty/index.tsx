import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import EmptyBox from "../../../components/EmptyBox";
import {useNavigation} from "@react-navigation/native";

function EmptySearch() {

  const navigation = useNavigation();
  const recommend = ['母爱', '韩式', '永生花', '长辈', '爱情', '玫瑰', '红色', '粉色', '礼盒'];
  const toSearch = (key: string) => {
    // @ts-ignore
    navigation.navigate('Search', {key});
  }

  return (
    <View>
      <EmptyBox type='list'/>

      <View style={styles.recommend}>
        <Text style={styles.header}> 换个词试一试</Text>
        <View style={styles.body}>
          {
            recommend.map((item, index) =>
              <Text style={styles.link} key={index} onPress={() => toSearch(item)}>{item}</Text>
            )
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recommend: {
    padding: 12,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
  },
  body: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  link: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
  }
})

export default EmptySearch;
