import {store} from "../redux/store";
import {CartType, GoodsType, HistoryType} from "./interface";
import {updateCart} from "../api";
import dayjs from "dayjs";

// 转换销量格式
export const transSaleCounts = (count: number): string => {
  if (count > 10000){
    return (count / 10000).toFixed(2) + '万'
  }else {
    return count + ''
  }
}

// 转换时间戳格式
export const format = (timestamp: number): string => {
  let time = new Date(timestamp);
  let Y = time.getFullYear() + '-';
  let M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-';
  let D = time.getDate() + ' ';
  return Y + M + D;
}

// 转换销量格式
export const transSaleCount = (count: number): string => {
  if (count > 10000){
    return (count / 10000).toFixed(2) + '万'
  }else {
    return count + ''
  }
}

// 保存购物车信息
export const saveCartInfo = async () => {
  const {User, Cart} = store.getState();
  if (User.token && Cart.count){
    const {data, check} = Cart;
    data.forEach((item: CartType) => {
      if (check.includes(item.id)) item.isChecked = 1;
      else item.isChecked = 0;
    });
    await updateCart(data);
    console.log('执行了保存购物车信息操作');
  }
}

// 日期分类
export const dateResort = (data: HistoryType[]) => {
  let newArr: any[] = [];
  data.forEach(old => {
    let index = -1;
    let createTime = dayjs(old.create_time).format('YYYY-MM-DD');
    let alreadyExist = newArr.some((newData, j) => {
      if (createTime === dayjs(newData.date).format('YYYY-MM-DD')){
        index = j;
        return true;
      }
    })
    if (!alreadyExist){
      let data = [];
      data.push(old);
      newArr.push({date: createTime, data})
    }else newArr[index].data.push(old);
  })
  return newArr;
}

// 时间戳转换为日期
export const formatTimestampToDay = (time: number | string): string => {
  const condition = 'day'
  switch (true){
    case dayjs(time).isSame(dayjs(), condition): return '今天';
    case dayjs(time).isSame(dayjs().subtract(1, condition), condition): return '昨天';
    case dayjs(time).isSame(dayjs(2, condition), condition): return '前天';
    default: return dayjs(time).format('M月D日');
  }
}

// 商品排序
export const sortSearchList = (data: GoodsType[], target: 'id' | 'sale_count' | 'price', type: number): GoodsType[] => {
  switch (type){
    case 1:
      return data.sort((a, b) => b[target] - a[target]);
    case 0:
      return data.sort((a, b) => a[target] - b[target]);
    default :
      return [];
  }
}
