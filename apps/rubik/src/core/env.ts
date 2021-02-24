/**
 * 应用环境配置
 *
 * ovine cli命令:  build/dev  --env=xxx 可以使用对应配置
 * dev 默认环境为 localhost, build 默认环境为 production
 */

const env = {
  // 默认配置,如果对应的环境的变量不设置，就会使用默认的
  default: {
    disableLimit: true,
    domains: {
      api: 'http://121.89.194.107:5222', // ovine api 地址
    },
  },
  // 本地开发
  localhost: {
    disableLimit: true,
    domains: {
      api: 'http://121.89.194.107:5222',
    },
    // 日志配置
    logger: {
      // 可根据需要写正则匹配
      moduleName: '.*',
    },
  },
  // 测试环境
  staging: {
    disableLimit: true,
    domains: {
      api: 'http://121.89.194.107:5222',
    },
  },
  // 生产环境
  production: {
    disableLimit: true,
    isProd: false, // 标示是生产环境
    domains: {
      api: 'http://sass.yffrom.com',
    },
  },
}

export default env

