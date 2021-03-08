/**
 * 验证码
 */

import { uuid } from 'amis/lib/utils/helper'
import React, { useState, useEffect } from 'react'

import { subscribe } from '@core/utils/message'

import { msgKey } from '~/core/constants'
import appRequestIns from '~/core/request'

const { url: src } = appRequestIns.getUrlByOption({
  url: '/manager/randCodeImage',
  domains: {
    'api': '/'
  }
})

export default () => {
  const [key, setKey] = useState('')

  const updateCode = () => {
    setKey(uuid())
  }

  useEffect(() => {
    subscribe(msgKey.updateAuthLoginCode, updateCode)
  }, [])

  return <img role='presentation'
    className="code-img" alt="验证码" src={`${src}?${key}`} onMouseUp={updateCode} />
}
