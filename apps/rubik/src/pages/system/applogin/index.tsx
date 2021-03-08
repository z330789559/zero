/**
 * 登录页面
 */

import { publish } from '@core/utils/message'
import { setStore, clearStore } from '@core/utils/store'

import { storeKey, msgKey } from '~/core/constants'

import authCode from './code'
import loginCss from './styled'


export const schema = {
  type: 'page',
  css: loginCss,
  body: {
    type: 'wrapper',
    className: 'login-wrapper b r-2x',
    body: [
      {
        type: 'html',
        html: `
          <h6 class="login-title">
            <img src="/static/images/logo_grey.png" />
            <p>遇服区块链服务平台</p>
          </h6>
        `,
      },
      {
        $preset: 'forms.managerForm',
      },
    ],
  },
  preset:
  {
    apis: {
      login: {
        domain: 'server',
        dataType: 'form-data',
        url: 'POST /manager/loginController.do?checkuser&remember=true',
        onError: () => {
          publish(msgKey.updateAuthLoginCode, '')
        },
        onSuccess: (source) => {
          const { code, msg, data } = source
          if (code === 0) {
            setStore(storeKey.auth, data)
            source.msg = '您已登录登录本系统'
          } else {
            clearStore(storeKey.auth)
            source.msg = msg || '登录异常'
          }
          return source
        },
      },

      assest: {
        domain: 'server',
        url: 'POST /assest/action/v1.0/SendUserLogin',
        onError: () => {
          publish(msgKey.updateAuthLoginCode, '')
        },
        onSuccess: (source) => {
          const { code, msg, data } = source
          if (code === 0) {
            setStore(storeKey.auth, data)
            source.msg = '您已登录登录本系统'
          } else {
            clearStore(storeKey.auth)
            source.msg = msg || '登录异常'
          }
          return source
        },
      },
    },
    forms: {
      assestForm: {
        type: 'form',
        className: 'login-form',
        title: '',
        mode: 'horizontal',
        horizontal: {
          left: 'col-sm-2',
          right: 'col-sm-9',
        },
        wrapWithPanel: false,
        autoFocus: false,
        api: '$preset.apis.assest',
        redirect: '/',
        controls: [
          {
            type: 'text',
            name: 'UserID',
            required: true,
            placeholder: '请输入用户名',
            label: '用户名',
            size: 'full',
          },
          {
            type: 'password',
            name: 'Password',
            label: '密码',
            required: true,
            placeholder: '请输入密码',
            size: 'full',
          },
          {
            type: 'group',
            label: ' ',
            gap: 'sm',
            inputClassName: 'justify-content-between',
            controls: [
              {
                type: 'checkbox',
                name: 'remember',
                label: '记住登录',
                value: true,
                mode: 'inline',
                className: 'inline',
                inputClassName: 'p-t-none',
              },
              {
                type: 'button',
                level: 'link',
                actionType: 'link',
                link: '/register',
                inputClassName: 'no-shadow',
                className: 'float-right',
                label: '注册账号',
                mode: 'inline',
              },
            ],
          },
          {
            type: 'submit',
            level: 'primary',
            label: '登录',
            inputClassName: 'w-full',
            horizontal: {
              left: 'col-sm-2',
              right: 'col-sm-9',
            },
          },
        ],
      },
      managerForm: {
        type: 'form',
        className: 'login-form',
        title: '',
        mode: 'horizontal',
        horizontal: {
          left: 'col-sm-2',
          right: 'col-sm-9',
        },
        wrapWithPanel: false,
        autoFocus: false,
        api: '$preset.apis.login',
        redirect: '/',
        controls: [
          {
            type: 'text',
            name: 'userName',
            required: true,
            placeholder: '请输入用户名',
            label: '用户名',
            size: 'full',
          },
          {
            type: 'password',
            name: 'password',
            label: '密码',
            required: true,
            placeholder: '请输入密码',
            size: 'full',
          },
          {
            type: 'group',
            label: '验证码',
            required: true,
            gap: 'sm',
            controls: [
              {
                type: 'text',
                name: 'randCode',
                required: true,
                placeholder: '请输入验证码',
                mode: 'inline',
                className: 'inline m-b-none',
                inputClassName: 'code-input',
              },
              {
                type: 'wrapper',
                labelClassName: 'w-auto',
                component: authCode,
                mode: 'inline',
              },
            ],
          },
          {
            type: 'group',
            label: ' ',
            gap: 'sm',
            inputClassName: 'justify-content-between',
            controls: [
              {
                type: 'checkbox',
                name: 'remember',
                label: '记住登录',
                value: true,
                mode: 'inline',
                className: 'inline',
                inputClassName: 'p-t-none',
              },
              {
                type: 'button',
                level: 'link',
                actionType: 'link',
                link: '/register',
                inputClassName: 'no-shadow',
                className: 'float-right',
                label: '注册账号',
                mode: 'inline',
              },
            ],
          },
          {
            type: 'submit',
            level: 'primary',
            label: '登录',
            inputClassName: 'w-full',
            horizontal: {
              left: 'col-sm-2',
              right: 'col-sm-9',
            },
          },
        ],
      },
    },
  },
}
