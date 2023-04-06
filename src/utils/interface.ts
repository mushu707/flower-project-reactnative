import {ReactNode} from "react";
import {StyleProp, TextStyle, ViewStyle} from "react-native";
import {FontWeight} from "react-native-svg";

/**
 * 请求数据
 */
// 横幅数据类型
export interface BannerType{
  id: number,
  img: string,
  isShow: number,
  update_time: number
}

// 商品数据类型
export interface GoodsType{
  id: number,
  name: string,
  img: string,
  price: number,
  original_price: number,
  sale_count: number,
  type: string,
  describe: string,
  slogan: string,
  huayu: string,
  material: string,
  packing: string
}

// 主页商品数据类型
export interface HomeType{
  id: number,
  name: string,
  style: string,
  desc: string,
  data: Array<GoodsType>
}

// 购物车数据类型
export interface CartType{
  id: number,
  name: string,
  img: string,
  price: number,
  original_price: number,
  buy_count: number,
  isChecked: number,
  create_time: number,
  update_time: number,
  uname: string
}

// 分类数据类型
export interface CategoryType{
  id: number,
  style: string,
  name: string,
  m_img: string,
  categories: SubCategoryType[]
}

// 子分类数据类型
interface SubCategoryType{
  id: number,
  name: string,
  type: string,
  tags: TagType[],
}

// 标签数据类型
interface TagType{
  id: number,
  title: string,
  icon: string,
  type: string,
  style: string
}

// 用户信息数据类型
export interface UserInfoType{
  name: string,
  identity: string,
  sex: number,
  phone: string,
  email: string,
  imageUrl: string,
  birth: number,
  loginTime: string,
  token: string
}

// 用户保存信息数据类型
export interface UserSaveInfoType{
  name?: string,
  phone?: string,
  email?: string,
  imageUrl?: string,
  sex?: number,
  birth?: number
}

// 收藏夹数据类型
export interface CollectionType{
  id: number,
  g_id: number,
  g_info: GoodsType,
  create_time: number
}

// 浏览历史记录数据类型
export interface HistoryType{
  id: number,
  g_id: number,
  g_info: GoodsType,
  create_time: number
}

/**
 * 组件数据
 */

// 底部导航数据类型
export interface TabsProps{
  key: string,
  icon: JSX.Element,
  text: string,
  badge?: number
}

// 顶部导航数据类型
export interface NavType{
  left?: JSX.Element | string,
  right?: JSX.Element | string,
  backArrow?: boolean,
  title: JSX.Element | string
}

// 图标盒子数据类型
export interface FuncProps{
  data: DataItem[],
  columns: number,
  size?: number,
  titleStyle?: StyleProp<TextStyle>,
  style?: StyleProp<ViewStyle>,
  cbType?: 'onClickSearch',
}

interface DataItem{
  id: number,
  svg?: JSX.Element | string,
  icon?: string,
  title?: string,
  style?: string,
  callback?: (value?: any) => void
}

// 商品盒子数据类型
export interface GoodsBoxProps{
  gap?: number,
  columns?: number,
  item_span?: number,
  type: 'info' | 'desc',
  data: GoodsType[]
}

// 空盒子数据类型
export interface EmptyBoxProps{
  type: 'cart' | 'list',
  token?: string,
  data?: Array<any>
}

// 自定义模框数据类型
export interface MyModalProps{
  children: JSX.Element,
  visible: boolean,
  setVisible?: () => void,
  style?: ViewStyle
}

// 搜索框数据类型
// export interface MySearchBarProps{
//   placeholder?: string,
//   style?: Object,
//   onFocus?: (e: React.FocusEvent<HTMLElement>) => void,
//   onBlur?: (e: React.FocusEvent<HTMLElement>) => void,
//   onSearch?: (value: string) => void
// }

// 搜索模式数据类型
export interface SearchModeProps{
  id: number,
  title: string,
  icon?: JSX.Element,
  func?: () => GoodsType[] | void
}

/**
 * redux数据
 */
export interface ActionStateProps{
  type: string,
  data?: Object
}

export interface AppStateProps{
  nav_bar?: boolean,
  tab_bar?: boolean,
  nav_data?: NavType
}

export interface UserStateProps{
  name?: string,
  imageUrl?: string,
  token?: string,
  identity?: string,
  loginTime?: string,
  count?: {
    cartCount: number,
    collectionCount: number,
    historyCount: number,
  }
}

export interface CartStateProps{
  count?: number,
  check?: number[],
  data?: Array<CartType>,
}

export interface CategoryStateProps{
  history?: string[],
  data?: CategoryType[]
}

export interface CollectionStateProps{
  collection?: [],
  data?: []
}
