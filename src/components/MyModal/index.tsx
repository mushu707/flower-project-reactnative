import React from 'react';
import {Modal, StyleSheet, View} from "react-native";
import {MyModalProps} from "../../utils/interface";

function MyModal(props: MyModalProps) {

  return (
    <View style={styles.containerView} onTouchEnd={props.setVisible}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}>
        <View style={[styles.containerView, {backgroundColor: 'rgba(0,0,0,0.5)'}]}>
          <View style={[styles.modalView, props.style]}>
            {props.children}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  }
});

export default MyModal;
