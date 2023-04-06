import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {store} from "../../../redux/store";
import {historyDeleteAction} from "../../../redux/action";
import MyModal from "../../../components/MyModal";
import {useNavigation} from "@react-navigation/native";

function SearchHistory() {

  const [history, setHistory] = useState(store.getState().Category.history as string[]);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const hotSearch = [
    {id: 1, title: '爱情'},
    {id: 2, title: '向日葵'},
    {id: 3, title: '蛋糕'},
    {id: 4, title: '玫瑰'},
    {id: 5, title: '满天星'},
    {id: 6, title: '母爱'},
    {id: 7, title: '康乃馨'},
    {id: 8, title: '红'},
  ];

  const toSearch = (key: string) => {
    //@ts-ignore
    navigation.navigate('Search', {key});
  }
  const cleanHistory = async () => {
    store.dispatch(historyDeleteAction());
    setHistory([]);
  }

  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed)
      store.subscribe(() => {
        setHistory(store.getState().Category.history as string[]);
      });

    return () => {
      isApiSubscribed = false;
    }
  }, [])

  return (
    <View style={styles.history}>
      {
        history.length
          ? <>
            <View style={styles.bodyHeader}>
              <Text style={styles.headerText}>历史搜索</Text>
              <FontAwesome name='trash-o' size={18} onPress={() => setVisible(true)}/>
            </View>
            <View style={styles.bodyItem}>
              {history.map((item, index) =>
                <Text style={styles.link} key={index} onPress={() => toSearch(item)}>{item}</Text>
              )}
            </View>
          </>
          : <></>
      }
      <>
        <View style={styles.bodyHeader}>
          <Text style={styles.headerText}>热门搜索</Text>
        </View>
        <View style={styles.bodyItem}>
          {hotSearch.map(item =>
            <Text style={styles.link} key={item.id} onPress={() => toSearch(item.title)}>{item.title}</Text>
          )}
        </View>
      </>
      <MyModal visible={visible} setVisible={() => setVisible(!visible)}>
        <>
          <Text style={styles.modalTitle}>是否删除搜索历史记录 ?</Text>
          <View style={styles.bottomFunc}>
            <TouchableOpacity onPress={cleanHistory}>
              <Text style={[styles.button, {borderColor: '#e3497e', color: '#e3497e', backgroundColor: 'rgba(227,73,126,.1)'}]}>确认</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.button, {borderColor: '#4987e3', color: '#4987e3', backgroundColor: 'rgba(73,135,227,0.1)'}]}>再想想</Text>
            </TouchableOpacity>
          </View>
        </>
      </MyModal>
    </View>
  );
}

const styles = StyleSheet.create({
  history: {
    height: '100%',
    padding: 12,
    backgroundColor: 'white'
  },
  bodyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bodyItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 20,
  },
  link: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: '#f3f3f3'
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  bottomFunc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: 10,
  }
})

export default SearchHistory;
