import {
  USERADDCOLLECTION,
  USERADDHISTORY,
  USERDELETECOLLECTION,
  USERDELETEHISTORY,
  USERLOGIN,
  USERLOGOUT,
  USERUPDATE
} from "../constant";
import {UserStateProps} from "../../utils/interface";

const initState: UserStateProps = {
  name: '',
  imageUrl: '',
  token: '',
  identity: '',
  loginTime: '',
  count: {
    cartCount: 0,
    collectionCount: 0,
    historyCount: 0
  }
}

const reducer = (state = initState, action: any) => {
  const {type, data} = action;
  const {count} = state;
  switch (type){
    case USERLOGIN:
      return {...state, ...data};
    case USERLOGOUT:
      return {...initState};
    case USERUPDATE:
      return {...state, ...data};
    case USERADDCOLLECTION:
      return {...state, count: {...count, collectionCount: count!.collectionCount + 1}}
    case USERDELETECOLLECTION:
      return {...state, count: {...count, collectionCount: count!.collectionCount - 1}}
    case USERADDHISTORY:
      return {...state, count: {...count, historyCount: count!.historyCount + 1}}
    case USERDELETEHISTORY:
      return {...state, count: {...count, historyCount: count!.historyCount - data}}
    default:
      return state;
  }
}

export default reducer;
