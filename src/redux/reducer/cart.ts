import {CARTADD, CARTDELETE, CARTINIT, CARTUPDATE} from "../constant";
import {CartStateProps} from "../../utils/interface";

const initState: CartStateProps = {
  count: 0,
  check: [],
  data: [],
}

const reducer = (state = initState, action: any) => {
  const {type, data} = action;
  const count = state.count as number;
  switch (type){
    case CARTADD:
      return {...state, count: count + 1};
    case CARTDELETE:
      return {...state, count: count - 1, data: data.list};
    case CARTUPDATE:
      return {...state, ...data};
    case CARTINIT:
      return {...initState};
    default:
      return state;
  }
}

export default reducer;
