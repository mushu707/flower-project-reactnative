import {CollectionStateProps} from "../../utils/interface";
import {COLLECTIONADD, COLLECTIONDELETE, COLLECTIONINIT, COLLECTIONUPDATE} from "../constant";

const initState: CollectionStateProps = {
  collection: [],
  data: [],
}

const reducer = (state = initState, action: any) => {
  const {type, data} = action;
  const {collection} = state;
  switch (type) {
    case COLLECTIONADD:
      return {...state, collection: [...collection!, data]};
    case COLLECTIONDELETE:
      return {...state, collection: collection?.filter(item => item !== data)};
    case COLLECTIONUPDATE:
      return {...state, ...data};
    case COLLECTIONINIT:
      return initState;
    default: return state;
  }
}

export default reducer;
