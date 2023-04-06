import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistStore, persistReducer} from 'redux-persist';
import User from './reducer/user';
import Cart from './reducer/cart';
import Collection from "./reducer/collection";
import Category from './reducer/category';

const persistConfig = {
  key: 'android_root',
  storage: AsyncStorage,
}

const reducer = combineReducers({
  User,
  Cart,
  Collection,
  Category
});

// 对 reducers 的封装处理
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, composeWithDevTools());

const persist = persistStore(store);

export {store, persist};


