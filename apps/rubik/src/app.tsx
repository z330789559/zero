/**
 * ovine 应用入口
 */

/* eslint-disable no-console */
import './public_path'
import '@core/app/includes'

import ReactDOM from 'react-dom'

import { appRootSelector } from '~/core/constants'

import renderOvineApp from './ovine'

import '~/components/renderer'

function storeTest(props) {
  props.onGlobalStateChange(
    (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
    true
  )
  props.setGlobalState({
    ignore: props.name,
    user: {
      name: props.name,
    },
  })
}

window.OVINE_DLL_REQUIRE_VER = '0.1.2-alpha.1'
if (!window.__POWERED_BY_QIANKUN__) {
  renderOvineApp({})
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped')
}

export async function mount(props) {
  console.log('[react16] props from main framework', props)
  storeTest(props)
  renderOvineApp(props)
}

export async function unmount(props) {
  const { container } = props
  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector(appRootSelector) : document.querySelector(appRootSelector)
  )
}
