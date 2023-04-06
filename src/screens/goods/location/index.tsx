import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function Location(props: {label: object}) {
  return (
    <>
      <Text style={props.label}>送至</Text>
      <Text style={{flexGrow: 1}}>
        <Ionicons name='location-outline' size={20}/>
        &nbsp;广东 广州
      </Text>
      <FontAwesome name='angle-right' size={20} style={{marginRight: 5}}/>
    </>
  );
}

export default Location;
