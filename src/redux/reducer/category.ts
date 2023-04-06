import {CATEGORYDATA, HISTORYADD, HISTORYDELETE} from "../constant";
import {CategoryStateProps} from "../../utils/interface";

const initState: CategoryStateProps = {
  history: [],
  data: [],
}

const reducer = (state = initState, action: any) => {
  const {type, data} = action;
  switch (type){
    case CATEGORYDATA:
      return {...state, data}
    case HISTORYADD:
      const {history} = state;
      return {...state, history: [...history!, data]};
    case HISTORYDELETE:
      return {...state, history: []};
    default:
      return state;
  }
}

export default reducer;
