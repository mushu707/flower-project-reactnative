import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import Swiper from 'react-native-swiper';
import {BannerType} from "../../../utils/interface";

function HomeSwiper(props: {data: BannerType[]}) {
  return (
    <View style={{height: 220}}>
      {props.data.length
        ? <Swiper
          horizontal={true}
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={3}
          dotColor='#ECECECB3'
          dotStyle={styles.dot}
          activeDotColor='#e8486c'
          activeDotStyle={styles.activeDot}
          paginationStyle={{bottom: 15}}>
          {props.data.map(item =>
            <View style={{margin: 12}} key={item.id}>
              <Image
                source={{uri: item.img}}
                resizeMode='contain'
                style={styles.swiperImg} />
            </View>
          )}
        </Swiper>
        : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    marginLeft: 4,
    marginRight: 4
  },
  activeDot: {
    paddingLeft: 8,
    paddingRight: 8
  },
  swiperImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
})

export default HomeSwiper;
