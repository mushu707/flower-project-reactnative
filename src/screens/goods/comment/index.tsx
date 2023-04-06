import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, Dimensions} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MyModal from "../../../components/MyModal";

function Comment() {

  const [modal, setModal] = useState<{img: string, visible: boolean}>({img: '', visible: false});
  const comments = [
    {
      id: 1,
      user: '闪*',
      avatar: 'https://img.hua.com/Avatar/ThirdLogo/2022/2/24/3832713.jpg',
      comment: '服务赞赞赞 花也特别好看 名字也很阳光',
      commentImg: [
        'https://img.hua.com/reviewpic/wxmp/2022/03/03/f52f3ea6d1354a7f802838db8a5794a1.jpg',
        'https://img.hua.com/reviewpic/wxmp/2022/03/03/6616febc1f2845cb902dd5fb6771de43.jpg',
        'https://img.hua.com/reviewpic/wxmp/2022/03/03/11a80c2053834a8c890f5f34290a4d81.jpg'
      ],
      address: '北京朝阳区'},
    {
      id: 2,
      user: '梦*晓',
      avatar: 'https://img.hua.com/Avatar/ThirdLogo/2017/1/2/1693649.jpg',
      comment: '新鲜粉粉的很漂亮，闺蜜非常喜欢',
      commentImg: [
        'https://img.hua.com/reviewpic/wxmp/2022/01/25/ec99daf5ef844ea4a4c315ddc91c8571.jpg',
        'https://img.hua.com/reviewpic/wxmp/2022/01/25/db4ef7c3966e462ea5f77df90fc4c80e.jpg',
        'https://img.hua.com/reviewpic/wxmp/2022/01/25/861676ce3e794732a404db1fd805ac1b.jpg'
      ],
      address: '广东深圳市龙华区'},
    {
      id: 3,
      user: '谷*',
      avatar: 'https://img02.hua.com/pc/assets/img/avatar_default_04.jpg',
      comment: '满意，挺好看的',
      commentImg: [
        'https://img.hua.com/reviewpic/m/2020/12/14/fe8bc32402a34ebd9f0127e74491d382.jpg',
        'https://img.hua.com/reviewpic/m/2020/12/14/7e1697480835447591a14b042b675ca9.jpg',
        'https://img.hua.com/reviewpic/m/2020/12/14/cd14c6a10af04cc3ba268535997aed80.jpg'
      ],
      address: '湖北武汉市武昌区'},
  ];

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.headerLeft}>晒单与评价({(Math.random() * 10000 + 1).toFixed(0)})</Text>
        <Text>查看全部 <FontAwesome name='angle-right' size={20}/></Text>
      </View>
      {
        comments.map(item =>
          <View key={item.id} style={{marginBottom: 10}}>
            <View style={styles.userHeader}>
              <Image source={{uri: item.avatar}} style={styles.avatar}/>
              <Text style={styles.name}>{item.user}</Text>
              <Text>
                <FontAwesome name='star' color={'#f56b6b'}/>
                <FontAwesome name='star' color={'#f56b6b'}/>
                <FontAwesome name='star' color={'#f56b6b'}/>
                <FontAwesome name='star' color={'#f56b6b'}/>
                <FontAwesome name='star'/>
              </Text>
            </View>
            <Text>{item.comment}</Text>
            <View style={styles.commentImgBody}>
              {
                item.commentImg.map((img, index) =>
                  <View key={index} onTouchEnd={() => setModal({img, visible: true})}>
                    <Image source={{uri: img}} style={styles.commentImg}/>
                  </View>
                )
              }
            </View>
            <Text style={styles.address}>{item.address}</Text>
          </View>
        )
      }
      <MyModal visible={modal.visible} setVisible={() => setModal({...modal, visible: false})} style={{backgroundColor: 'transparent'}}>
        <Image source={{uri: modal.img}} style={{width: Dimensions.get('window').width, height: 500}} resizeMode='contain'/>
      </MyModal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#f5f5f5'
  },
  headerLeft: {
    flex: 1,
    fontSize:  16,
    fontWeight: 'bold'
  },
  userHeader: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30
  },
  name: {
    flexGrow: 1,
    marginLeft: 10,
  },
  commentImgBody: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
  },
  commentImg: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  address: {
    fontSize: 12,
    color: '#a7a7a7',
  }
})

export default Comment;
