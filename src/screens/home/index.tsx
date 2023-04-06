import React, {useEffect, useState} from 'react';
import {SectionList, StyleSheet, Text, View} from "react-native";
import {getCategory, getHomeInfo} from "../../api";
import {BannerType, HomeType} from "../../utils/interface";
import HomeSwiper from "./swiper";
import GoodsBox from "../../components/GoodsBox";
import ProNav from "./proNav";
import {store} from "../../redux/store";
import {categoryGetDataAction} from "../../redux/action";

function Home() {

  const [data, setData] = useState<{banner: BannerType[], home: HomeType[]}>({banner: [], home: []})
  const [refresh, setRefresh] = useState(false);

  const getHomeData = () => {
    getHomeInfo().then(res => {
      const {homeList, bannerList, goodsList} = res.data;
      const newBanner = bannerList.filter((item: BannerType) => item.isShow === 1);
      homeList.forEach((data: HomeType) => data.data = goodsList[data.style])
      setData({banner: newBanner, home: homeList});
    });
    setTimeout(() => {
      setRefresh(false);
    }, 700)
  }

  useEffect(() => {
    getHomeData();
    getCategory().then(res => {
      const {category} = res.data;
      store.dispatch(categoryGetDataAction(category));
    });
  }, [])

  return <>
    {
      data.home.length ?
        <SectionList
          showsVerticalScrollIndicator={false}
          sections={data.home}
          keyExtractor={(item, index) => item.type + index}
          ListHeaderComponent={() => <>
            <HomeSwiper data={data.banner}/>
            <ProNav/>
          </>}
          renderItem={({item}) => <GoodsBox data={item}/>}
          renderSectionHeader={({section: {name, desc}}) => <Text style={styles.homeTitle}>{name + ' | ' + desc}</Text>}
          onRefresh={() => {
            setRefresh(true)
            getHomeData();
          }}
          refreshControl={<View><Text>刷新</Text></View>}
          refreshing={refresh}
        />
        : <></>
    }
  </>
}

const styles = StyleSheet.create({
  homeTitle: {
    marginTop: 10,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    color: '#3b3b3b',
    fontWeight: 'bold'
  },
})

export default Home;
