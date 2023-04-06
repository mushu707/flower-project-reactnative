import {
  ActionStateProps,
  CartStateProps,
  CartType,
  CategoryType,
  CollectionStateProps,
  UserStateProps
} from "../utils/interface";
import {
  CARTADD,
  CARTDELETE,
  CARTINIT,
  CARTUPDATE, CATEGORYACTIVE, CATEGORYDATA,
  COLLECTIONADD,
  COLLECTIONDELETE,
  COLLECTIONINIT,
  COLLECTIONUPDATE, HISTORYADD, HISTORYDELETE,
  USERADDCOLLECTION,
  USERADDHISTORY,
  USERDELETECOLLECTION,
  USERDELETEHISTORY,
  USERLOGIN,
  USERLOGOUT,
  USERUPDATE
} from "./constant";

export const userLoginAction = (data: UserStateProps): ActionStateProps => ({type: USERLOGIN, data});
export const userLogoutAction = (): ActionStateProps => ({type: USERLOGOUT});
export const userUpdateAction = (data: {name: string, imageUrl: string}): ActionStateProps => ({type: USERUPDATE, data});
export const userCollectionAddAction = (): ActionStateProps => ({type: USERADDCOLLECTION});
export const userCollectionDeleteAction = (): ActionStateProps => ({type: USERDELETECOLLECTION});
export const userHistoryAddAction = (): ActionStateProps => ({type: USERADDHISTORY});
export const userHistoryDeleteAction = (count: number): ActionStateProps => ({type: USERDELETEHISTORY, data: count});

export const cartAddAction = (): ActionStateProps => ({type: CARTADD});
export const cartDeleteAction = (data: {list: CartType[]}): ActionStateProps => ({type: CARTDELETE, data});
export const cartUpdateInfoAction = (data: CartStateProps): ActionStateProps => ({type: CARTUPDATE, data});
export const cartInitAction = (): ActionStateProps => ({type: CARTINIT});

export const collectionAddAction = (data: number): ActionStateProps => ({type: COLLECTIONADD, data});
export const collectionDeleteAction = (data: number): ActionStateProps => ({type: COLLECTIONDELETE, data});
export const collectionUpdateAction = (data: CollectionStateProps): ActionStateProps => ({type: COLLECTIONUPDATE, data});
export const collectionInitAction = (): ActionStateProps => ({type: COLLECTIONINIT});

export const categoryGetDataAction = (data: CategoryType[]): ActionStateProps => ({type: CATEGORYDATA, data});
export const historyAddAction = (data: string): ActionStateProps => ({type: HISTORYADD, data});
export const historyDeleteAction = (): ActionStateProps => ({type: HISTORYDELETE});
