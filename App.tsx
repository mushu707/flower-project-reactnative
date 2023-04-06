import React, {useEffect} from 'react';
import IndexNavigation from "./src/navigation";
import {ToastProvider} from "react-native-fast-toast";
import {AppState} from "react-native";
import {saveCartInfo} from "./src/utils";

function App() {

  useEffect(() => {
    const subscription = AppState.addEventListener('blur', () => saveCartInfo())
    return () => {
      subscription.remove();
    }
  }, [])

  return (
    // @ts-ignore
    <ToastProvider>
      <IndexNavigation/>
    </ToastProvider>
  );
}
export default App;
