import React, {useState} from 'react';
import {StyleSheet, View} from "react-native";
import SearchHistory from "./history";
import Main from "./main";
import {store} from "../../redux/store";
import {historyAddAction} from "../../redux/action";
import {useNavigation} from "@react-navigation/native";
// @ts-ignore
import Search from 'react-native-search-box';

function Category() {

  const [isMain, setIsMain] = useState(true);
  const navigation = useNavigation();

  const toSearch = (key: string) => {
    if (key && key.trim()){
      store.dispatch(historyAddAction(key));
      // @ts-ignore
      navigation.navigate('Search', {key});
    }
  }

  return (
    <View>
      <View style={styles.search}>
        <Search
          backgroundColor='white'
          titleCancelColor='#e3497e'
          onFocus={() => setIsMain(false)}
          onSearch={(key: string) => toSearch(key)}
          onCancel={() => setIsMain(true)}/>
      </View>
      {
        isMain ? <Main category={store.getState().Category.data}/>  : <SearchHistory/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    borderBottomWidth: 2,
    borderBottomColor: '#eeeeee'
  }
})

export default Category;
