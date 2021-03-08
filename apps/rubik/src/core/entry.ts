// entry 实际上就是路由配置，必须为数组

import asideLayout from '~/components/layout'

import { loginRoute, appLoginRoute } from './constants'
// import { onAuth } from './user'
import { getLink } from './utils'

const entry = [
  {
    type: 'preset-route', // 路由组件
    path: loginRoute,
    pathToComponent: true,
  },


  {
    type: 'private-route', // 鉴权路由
    path: '/',
    redirect: loginRoute,
    // onAuth, // 每次页面鉴权 需要调用的认证方法
    children: {
      type: 'switch-route',
      children: [
        {
          type: 'preset-route', // 路由组件
          path: appLoginRoute,
          pathToComponent: true,
        },
        {
          type: 'preset-route', // 路由组件
          path: '/system/assestlogin',
          pathToComponent: '/system/assestlogin',
        },
        {
          type: 'preset-route',
          exact: true,
          path: getLink('appSystem', 'design/:pageId'),
          pathToComponent: getLink('appSystem', 'design'),
        },
        asideLayout,
      ],
    },
  },
]

export default entry
