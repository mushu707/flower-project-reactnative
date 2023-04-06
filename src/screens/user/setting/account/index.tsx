import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {UserInfoType, UserSaveInfoType} from "../../../../utils/interface";
import {getUserInfo, updateUserInfo} from "../../../../api";
import {Asset, launchCamera, launchImageLibrary} from "react-native-image-picker";
import MyModal from "../../../../components/MyModal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ToastIcon from "../../../../components/ToastIcon";
import {useToast} from "react-native-fast-toast";
import {store} from "../../../../redux/store";
import {userUpdateAction} from "../../../../redux/action";
import axios from "axios";
import dayjs from 'dayjs';
// @ts-ignore
import {DatePicker} from 'react-native-common-date-picker';
// @ts-ignore
import RadioButtonRN from 'radio-buttons-react-native';

function Account() {

  const picker = useRef(new Animated.Value(220)).current;
  const toast = useToast();
  const [info, setInfo] = useState<UserInfoType>();
  const [saveInfo, setSaveInfo] = useState<UserSaveInfoType>();
  const [modal, setModal] = useState(false);

  const showPicker = () => {
    Animated.timing(picker, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  }
  const hidePicker = () => {
    Animated.timing(picker, {
      toValue: 220,
      duration: 300,
      useNativeDriver: true
    }).start();
  }
  const item = [
    {
      id: 1,
      label: '姓名',
      value: <TextInput
        style={styles.text}
        defaultValue={info?.name}
        onChangeText={(name) => setSaveInfo({...saveInfo, name})}
      />
    },
    {
      id: 2,
      label: '手机',
      value: <TextInput
        style={styles.text}
        defaultValue={info?.phone}
        onChangeText={(phone) => setSaveInfo({...saveInfo, phone})}
      />
    },
    {
      id: 3,
      label: '邮箱',
      value: <TextInput
        style={styles.text}
        defaultValue={info?.email}
        onChangeText={(email) => setSaveInfo({...saveInfo, email})}
      />
    },
    {
      id: 4,
      label: '性别',
      value: <RadioButtonRN
        box={false}
        data={[{label: '男'}, {label: '女'}]}
        initial={info?.sex! || 2}
        style={{flexDirection: 'row', marginVertical: 8}}
        selectedBtn={(val: {label: string}) => setSaveInfo({...saveInfo, sex: val.label === '男' ? 1 : 0})}
        boxStyle={{width: 70}}
        textStyle={{marginLeft: 10}}
        animationTypes={['pulse']}
      />
    },
    {
      id: 5,
      label: '生日',
      value: <Text style={styles.birth} onPress={showPicker}>
        {saveInfo?.birth || info?.birth ? dayjs(saveInfo?.birth || info?.birth).format('YYYY-MM-DD') : '未设置生日'}
      </Text>
    },
  ];

  const selUploadPhotoWay = (type: 'camera' | 'library') => {
    const handleRes = (res: any) => {
      if (!res.didCancel && res.assets) uploadAvatar(res.assets[0]).then(res => setSaveInfo({...saveInfo, imageUrl: res.url}));
      else toast.show('上传图片失败!', {icon: <ToastIcon name='remove'/>})
    }
    switch (type){
      case "library":
        launchImageLibrary({mediaType: 'photo'}).then(res => handleRes(res)); break;
      case "camera":
        launchCamera({mediaType: 'photo'}).then(res => handleRes(res)); break;
    }
  }
  const uploadAvatar = async (file: Asset) => {
    const formData = new FormData();
    let url: string = '';
    formData.append('file', {
      // @ts-ignore
      uri: file.uri, type: 'multipart/form-data', name: file.fileName
    });
    await axios.post('http://localhost:4000/user', formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => {if (res.data.code === 200) url = res.data.url;})
    return {url}
  }
  const upload = () => {
    const newInfo = Object.assign(info, saveInfo) as UserSaveInfoType
    updateUserInfo(newInfo).then(res => {
      if (res.code === 200) {
        store.dispatch(userUpdateAction({name: newInfo.name!, imageUrl: newInfo.imageUrl!}));
        toast.show('保存成功!', {icon: <ToastIcon name='check'/>});
      }
      else toast.show('保存失败, 请稍后再试', {icon: <ToastIcon name='remove'/>});
    })
  }

  useEffect(() => {
    getUserInfo().then(res => {
      if (res.code === 200) setInfo(res.data);
    })
  }, [])

  return (
    <View style={styles.account}>
      <FlatList
        data={item}
        style={{flexGrow: 0}}
        renderItem={({item}) =>
          <View style={styles.item}>
            <Text style={styles.label}>{item.label}</Text>
            <View style={styles.value}>{item.value}</View>
          </View>} keyExtractor={((item) => item.id.toString())}
        ListHeaderComponent={
          <View style={styles.avatar} onTouchStart={() => setModal(true)}>
            <Image
              style={styles.img}
              source={{uri: saveInfo?.imageUrl || info?.imageUrl}}/>
            <Text style={{fontSize: 12}}>点击修改头像</Text>
          </View>
        }
        ListFooterComponent={
          <TouchableOpacity style={styles.saveBtn} activeOpacity={.7} onPress={upload}>
            <Text style={styles.saveTitle}>保存</Text>
          </TouchableOpacity>
        }/>

      <Animated.View style={{transform: [{translateY: picker}], position: 'absolute', bottom: 0}}>
        <DatePicker
          cancelText='取消'
          confirmText='确认'
          yearSuffix='年'
          monthSuffix='月'
          daySuffix='日'
          cancel={hidePicker}
          confirm={(val: string) => {
            setSaveInfo({...saveInfo, birth: dayjs(val).valueOf()});
            hidePicker();
          }}
        />
      </Animated.View>

      <MyModal visible={modal} setVisible={() => setModal(!modal)}>
        <>
          <Text style={styles.sel_func} onPress={() => selUploadPhotoWay('camera')}>
            <FontAwesome name='camera' size={16}/> &nbsp; 相机拍摄</Text>
          <Text style={styles.sel_func} onPress={() => selUploadPhotoWay('library')}>
            <FontAwesome name='photo' size={16}/> &nbsp; 从图库中选择</Text>
        </>
      </MyModal>
    </View>
  );
}

const styles = StyleSheet.create({
  account: {
    flex: 1,
    backgroundColor: 'white',
  },
  avatar: {
    alignItems: 'center',
    margin: 15,
  },
  img: {
    width: 70,
    height: 70,
    backgroundColor: '#f3eef0',
    borderRadius: 35,
    margin: 5
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f8f4f4',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
    color: '#555555'
  },
  value: {
    flexGrow: 1,
    marginLeft: 15,
  },
  text: {
    color: '#787878',
  },
  birth: {
    marginVertical: 15,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sel_func: {
    backgroundColor: '#e75c89',
    color: 'white',
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
    fontSize: 14,
    fontWeight: 'bold'
  },
  saveBtn: {
    alignSelf: 'center',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e75c89',
    marginTop: 20,
    padding: 12,
    borderRadius: 22,
  },
  saveTitle: {
    fontWeight: 'bold',
    color: 'white'
  }
})
export default Account;
