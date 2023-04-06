import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

function ToastIcon(props: {name: string}) {
  return (
    <FontAwesomeIcon name={props.name} color='white'/>
  );
}

export default ToastIcon;
