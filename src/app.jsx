import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import dva from './utils/dva'
import models from './models'

import './app.less'
//taro-ui全局引入一次即可
import 'taro-ui/dist/style/index.scss'
<<<<<<< HEAD
=======
import './styles/taro-ui.css'
>>>>>>> 7184343574601f3b39100f529311b787de22e2e3

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5') {
//   require('nerv-devtools')
// }

const dvaApp = dva.createApp({
  initialState: {},
<<<<<<< HEAD
=======
  onError(err) {
    // 在这里进行错误处理
    console.log(err);
  },
>>>>>>> 7184343574601f3b39100f529311b787de22e2e3
  models: models,
});
const store = dvaApp.getStore();

class App extends Component {

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  config = {
    pages: [
      'pages/login/index',//登录页面
      'pages/articleDetail/index',//文章详情页

      'pages/tabs/tabHome/index',
      'pages/tabs/tabArticle/index',
      'pages/tabs/tabQuestion/index',
      'pages/tabs/tabRecord/index',
      'pages/tabs/tabUser/index',

    ],
    subPackages: [
      {
        root: "minePages/",
        pages: [
          //个人中心
          'message/index',//消息中心页面
          // 'setting/index',//设置页面
          // 'about/index',//关于我们页面
          'userCenter/index',//个人中心页面
          'likeOrCollect/index'//点赞或收藏页面
          // 'editName/index',//修改昵称页面
          // 'editMobile/index',//修改昵称页面
          // 'agreement/index',//星座女神服务条款和隐私政策页面
        ]
      },
      {
        root: "pages/astro/",
        pages: [
          'detail/index',//星盘页面
          'synastryAstro/index',//星盘-合盘页面
          'predict/index',//本命预测页面
          'predictPlanetDetail/index',//本命预测-行星详情页面
          'horoscope/index',//八字页面
          'natalOrNowParamsDetail/index',//本命或者天象盘的参数页面
          'astroSetting/index',//星盘配置页面
        ]
      },
      {
        root: "pages/record/",
        pages: [
          //档案
          'recordSelect/index',//档案选择页面
          'recordCatAdd/index',//新建档案袋页
          'recordAdd/index',//新建档案页
          'recordNameAndTagAdd/index',//新建档案-》姓名/标签页
          'recordMoveCat/index',//移入档案到-档案袋页面
          'catRecords/index',//档案袋item点击-》档案详情页面
        ]
      },
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '蓝莓说',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom',
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/tabs/tabHome/index",
          text: "首页",
          iconPath: "./images/tab/home.png",
          selectedIconPath: "./images/tab/home-active.png"
        },
        {
          pagePath: "pages/tabs/tabArticle/index",
          text: "星文",
          iconPath: "./images/tab/article.png",
          selectedIconPath: "./images/tab/article-active.png"
        },
        // {
        //   pagePath: "pages/tabs/tabQuestion/index",
        //   text: "问答",
        //   iconPath: "./images/tab/question.png",
        //   selectedIconPath: "./images/tab/question-active.png"
        // },
        {
          pagePath: "pages/tabs/tabRecord/index",
          text: "档案",
          iconPath: "./images/tab/record.png",
          selectedIconPath: "./images/tab/record-active.png"
        },
        {
          pagePath: "pages/tabs/tabUser/index",
          text: "我的",
          iconPath: "./images/tab/user.png",
          selectedIconPath: "./images/tab/user-active.png"
        }
      ],
      color: '#333',
      selectedColor: '#6c5fd3',
      backgroundColor: '#fff',
      borderStyle: 'black'
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>

    )
  }
}

Taro.render(<App />, document.getElementById('app'))
