import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View, Animated, Dimensions, Image} from "react-native";
import {sortSearchList} from "../../utils";
import {CategoryType, GoodsType, SearchModeProps} from "../../utils/interface";
import {getMoreData, getSearchList} from "../../api";
import EmptySearch from "./empty";
import GoodsBox from "../../components/GoodsBox";
import AntDesign from "react-native-vector-icons/AntDesign";
import {store} from "../../redux/store";
import {useNavigation} from "@react-navigation/native";

function Search({route}: any) {

  const [activeKey, setActiveKey] = useState(1);
  const [resList, setResList] = useState<GoodsType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [begin, setBegin] = useState(0);
  const [count] = useState(6);
  const navigation = useNavigation();
  const pop = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const filter: SearchModeProps[] = [
    {id: 1, title: '综合', func: () => sortSearchList(resList, 'id', 0)},
    {id: 2, title: '销量', func: () => sortSearchList(resList, 'sale_count', 1)},
    {id: 3, title: '价格', func: () => sortSearchList(resList, 'price', 1)},
  ];

  const handleActive = (item: SearchModeProps) => {
    setActiveKey(item.id);
    if (item.func) item.func();
  }
  const lazyHasMore = (cb: () => void) => {
    setTimeout(cb, 1500);
  }
  const loadMoreData = async () => {
    const {key, style} = route.params;
    if (hasMore && resList.length >= count){
      const res: GoodsType[] = await getMoreData({key, style, begin, count});
      setBegin(prev => prev + count);
      lazyHasMore(() => {
        setResList(prev => [...prev, ...res]);
        if (res.length === 0) setHasMore(false);
      })
    }else lazyHasMore(() => setHasMore(false));
  }
  const popUp = () => {
    Animated.timing(pop, {
      toValue: 0,
      useNativeDriver: true
    }).start();
  }
  const popDown = () => {
    Animated.timing(pop, {
      toValue: Dimensions.get('window').width,
      useNativeDriver: true
    }).start();
  }
  const category = () => {
    const data: CategoryType[] = store.getState().Category.data;
    return data.filter(item => item.style === route.params.style)[0];
  }
  const toSearch = (key: string, style: string) => {
    // @ts-ignore
    navigation.push('Search', {key, style});
  }

  useEffect(() => {
    const {key, style} = route.params;
    getSearchList({key, style, begin: 0, count}).then(res => {
      setResList(res.data.searchList);
      setBegin(prev => prev + count);
    })
  }, [])

  return (
    <View>
      {
        resList.length
          ? <FlatList
            data={resList}
            keyExtractor={(item => item.id.toString())}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={styles.filter}>
                {filter.map(item =>
                  <Text
                    key={item.id}
                    style={[styles.filterItem, activeKey === item.id && styles.active]}
                    onPress={() => handleActive(item)}>
                    {item.title}
                  </Text>)}
                {route.params.style ? <Text style={styles.filterItem} onPress={popUp}>筛选 <AntDesign name='filter' size={15}/></Text> : <></>}
              </View>
            }
            ListFooterComponent={
              hasMore
                ? <ActivityIndicator style={styles.loading} size='small' color='#e3497e'/>
                : <Text style={styles.loadingText}>🌌 已经到世界的尽头了...</Text>}
            onEndReached={() => loadMoreData()}
            renderItem={({item}) => <GoodsBox data={item}/>}
            />
          : <EmptySearch/>
      }

      {
        route.params.style &&
        <Animated.View style={{transform: [{translateX: pop}], position: 'absolute', right: 0, top: 0}}>
          <View style={styles.pop}>
            <View style={styles.popBlank} onTouchStart={popDown}/>
            <FlatList
              data={category().categories ? category().categories : []}
              style={styles.popBody}
              keyExtractor={(item => item.id.toString())}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) =>
                <View style={[styles.categoryItem, {marginBottom: index === category().categories.length - 1 ? 70 : 10}]}>
                  <Text style={styles.categoryTitle}>{item.name.split('_')[1]}</Text>
                  <View style={styles.categoryBody}>
                    {
                      item.tags.map(tag =>
                        <View key={tag.id} style={{width: '33%'}} onTouchEnd={() => toSearch(tag.title, tag.style)}>
                          <Text style={[styles.tagTitle, route.params.key === tag.title && styles.activeTag]}>{tag.title}</Text>
                        </View>
                      )
                    }
                  </View>
                </View>
              }>
            </FlatList>
          </View>
        </Animated.View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  filterItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 15,
    textAlign: 'center',
  },
  active: {
    color: '#e3497e',
    fontWeight: 'bold'
  },
  loading: {
    marginBottom: 10,
    alignSelf: 'center',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 10
  },
  pop: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  popBlank: {
    width: '20%',
    height: '100%',
    backgroundColor: 'transparent'
  },
  popBody: {
    width: '80%',
    height: '100%',
    alignSelf: 'flex-end',
    backgroundColor: 'white'
  },
  categoryItem: {
    padding: 10,
  },
  categoryTitle: {
    fontSize: 16,
    marginBottom: 15
  },
  categoryBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tagTitle: {
    padding: 8,
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#f5f5f5',
    marginRight: 10,
    marginBottom: 10,
  },
  activeTag: {
    borderWidth: 1,
    borderColor: '#e3497e',
    color: '#e3497e',
    backgroundColor: 'white',
  }
})

export default Search;
