import axios from "axios";

declare module 'axios'{
  interface IAxios<D = null>{
    code: number,
    message: string,
    extra: D
  }
  export interface AxiosResponse<T = any> extends IAxios {}
}
