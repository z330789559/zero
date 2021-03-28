/**
 * 应用环境配置
 *
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
    disableLimit: false,
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
    domains: {
      api: 'http://platform.yffrom.com',
    },
  },
  // 生产环境
  production: {
    disableLimit: true,
    isProd: false, // 标示是生产环境
    domains: {
      api: 'http://platform.yffrom.com',
    },
  },
}

export default env
