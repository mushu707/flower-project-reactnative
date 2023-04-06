import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Hoshi } from 'react-native-textinput-effects';
import {useToast} from "react-native-fast-toast";
import {resetPassword} from "../../../../api";
import ToastIcon from "../../../../components/ToastIcon";

function ResetPsw() {

  const [oldPsw, setOldPsw] = useState<string>();
  const [newPsw, setNewPsw] = useState<string>();
  const [checkPsw, setCheckPsw] = useState<string>();
  const toast = useToast();

  const item = [
    {id: 1, label: '旧密码', bindValue: oldPsw, func: setOldPsw},
    {id: 2, label: '新密码', bindValue: newPsw, func: setNewPsw},
    {id: 3, label: '再次输入新密码', bindValue: checkPsw, func: setCheckPsw},
  ]

  const reset = () => {
    if (oldPsw && newPsw && checkPsw) {
      if (newPsw !== checkPsw) toast.show('两次输入新密码不一致，请重新输入');
      else {
        resetPassword({oldPsw, newPsw}).then(res => {
          if (res.code === 200) toast.show('修改密码成功!', {type: 'success', icon: <ToastIcon name='check'/>});
          else toast.show(res.message, {type: 'danger', icon: <ToastIcon name='remove'/>})
        })
      }
    }else toast.show('输入框不能为空');
  }

  return (
    <View style={styles.reset}>
      <FlatList
        data={item}
        style={{flexGrow: 0}}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) =>
          <Hoshi
            label={item.label}
            style={styles.resetInput}
            borderColor={'#e75c89'}
            inputPadding={16}
            secureTextEntry={true}
            onChangeText={(val) => item.func(val)}/>
        }
      />
      <TouchableOpacity style={styles.resetPswBtn} activeOpacity={.7} onPress={reset}>
        <Text style={styles.resetTitle}>修改密码</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  reset: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 20
  },
  resetInput: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
  resetPswBtn: {
    alignSelf: 'center',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e75c89',
    marginTop: 20,
    padding: 12,
    borderRadius: 22,
  },
  resetTitle: {
    fontWeight: 'bold',
    color: 'white'
  }
})

export default ResetPsw;
