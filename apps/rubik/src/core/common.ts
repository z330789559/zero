import { defaults, pick, get } from 'lodash'

import { matchPath } from 'react-router-dom'

import { getStore, setStore } from '@core/utils/store'

import { app } from '@ovine/core/lib/app'

import { storeKey } from './constants'
import { CustomType } from './types'
import { isStrTrue, runWithQianKun } from './utils'

let store: any = getCacheStore()
let homePageId = ''

// 设置站点自定义信息
function applySiteCustom(custom: any = store.custom) {
  const { name, favicon, logo } = custom
  if (name) {
    document.title = name
    $('link[rel="shortcut icon"]').attr('href', favicon || logo)
  }
}

// 获取缓存信息
function getCacheStore() {
  const appInfo: any = getStore(storeKey.appInfo) || {}
  const orgInfo: any = getStore(storeKey.orgInfo) || {}
  const custom: any = getStore(storeKey.siteCustom) || {}

  applySiteCustom(custom)

  return {
    appInfo,
    orgInfo,
    custom,
  }
}

// 设置 ovine 常量信息
export function setOvineConstants(source: string | any[]) {
  if (source) {
    const constants = {}
    const constArr = typeof source === 'string' ? JSON.parse(source) : source
    constArr.forEach(({ name, value }) => {
      constants[name] = value
    })
    app.amis.constants = constants
  }
}

// 同步更新后的 APP Info
export function syncAppInfo(info) {
  store.appInfo = {
    ...store.appInfo,
    ...info,
  }
}
// 获取组织ID
export const getUrlOrgId = (): string => {
  const matched = matchPath(window.location.pathname, {
    path: '/platform/app/:orgId',
  })
  return get(matched, 'params.orgId') || ''
}

export function getAppInfo() {
  return store.appInfo
}

export function getOrgInfo() {
  return store.orgInfo
}

export function getOrgId() {
  return store.orgInfo.orgId || getUrlOrgId()
}

export function setHomePageId(id: string) {
  homePageId = id
}

export function getHomePageId() {
  return homePageId
}

export function isAppIsolation(exact: boolean = false, appInfo: any = store.appInfo) {
  // 未在 qiankun 中，默认为独立应用，仅在测试环境有效，生产环境不允许篡改 isolation 独立应用功能。
  const isDevIsolation = process.env.NODE_ENV !== 'production' && !runWithQianKun()

  const isExactIsolation = isStrTrue(appInfo.isolation)

  if (exact === true) {
    return isExactIsolation
  }

  return isExactIsolation || isDevIsolation
}

export function setStoreInfo(source: any) {
  const { appInfo, orgInfo } = source

  // 合并 组织与应用的设置信息
  let custom = {
    ...orgInfo,
    ...appInfo,
  }

  if (!isAppIsolation(true)) {
    custom = {
      ...orgInfo,
      ...pick(appInfo, ['title', 'logo']),
    }
  }

  setStore(storeKey.appInfo, appInfo)
  setStore(storeKey.orgInfo, orgInfo)
  setStore(storeKey.siteCustom, custom)
  setOvineConstants(appInfo.app_env_constants)
  homePageId = appInfo.app_home_page_id || ''

  store = getCacheStore()
}

export function getAppCustom(): CustomType {
  const info = store.custom
  const defImg = 'https://static.igroupes.com/ovine_bg_cxd.jpeg'

  return defaults(info, {
    login_bg_img: defImg,
    login_intro_img: defImg,
    login_logo: info.logo,
    login_title: info.title,
  })
}
