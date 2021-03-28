import { confirm, toast, Spinner } from 'amis'
import { Icon } from 'amis/lib/components/icons'
import { cloneDeep } from 'lodash'
import React, { useEffect } from 'react'

import { Amis } from '@core/components/amis/schema'
import { useImmer, useSubscriber } from '@core/utils/hooks'
import { publish } from '@core/utils/message'

import { msgKey } from '~/core/constants'
import { getLink, isStrTrue, linkTo } from '~/core/utils'

import { getOrgAppApis } from './api'
import { AppControls } from './schema'
import * as S from './styled'

const defBg =
  'https://striker.teambition.net/thumbnail/110icf34e88844ff7d5a862d8373b2a7f2e6/w/600/h/300'
const defIcon = 'https://ovine.igroupes.com/demo/static/images/favicon.ico'

type ItemProps = {
  item: any
  appApis: any
  toggleDialog: (toggle: boolean, info: any) => void
}
const CardItem = (props: ItemProps) => {
  const { toggleDialog, appApis, item = {} } = props

  const { id, config = {}, user = {} } = item

  const isolation = isStrTrue(config.isolation)

  const itemBgStyle = {
    backgroundImage: `url(${config.org_app_bg || defBg})`,
  }
  const icoImgStyle = {
    backgroundImage: `url(${config.logo || defIcon})`,
  }

  const onEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const _config = cloneDeep(config)
    _config.username = user.username
    _config.user_id = user.id
    toggleDialog(true, _config)
  }

  const onDelClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    confirm(
      `确认是否删除该应用 【${config.name}】,删除应用后将不可恢复！请谨慎操作～`,
      '删除确认'
    ).then(async (choose) => {
      if (choose) {
        await appApis.orgDelAppApi(id)
        publish(msgKey.updateOrgAppList)
        toast.success('删除应用成功')
      }
    })
  }

  const onCardClick = () => {
    const appLink = getLink('app', undefined, isolation ? `${id}/system/login` : `${id}/`)
    linkTo(appLink)
  }

  return (
    <S.StyledCardItem className="col-lg-3" onClick={onCardClick}>
      <div className="item-content">
        {isolation && (
          <div className="app-mark">
            <Icon icon="leftTopMark" />
            <span>独立应用</span>
          </div>
        )}
        <div className="item-cover" style={itemBgStyle} />
        <div className="item-mask" />
        <ul className="item-actions">
          <li
            className="fa fa-cog"
            data-tooltip="编辑"
            data-position="bottom"
            onClick={onEditClick}
          />
          <li
            className="fa fa-trash-o"
            data-tooltip="删除  "
            data-position="bottom"
            onClick={onDelClick}
          />
        </ul>
        <div className="item-info">
          <h6 className="item-title">
            <i style={icoImgStyle} />
            <span>{config.name}</span>
          </h6>
          <p>
            {config.org_desc ? (
              config.org_desc
            ) : (
              <span className="text-secondary">暂无应用描述</span>
            )}
          </p>
        </div>
      </div>
    </S.StyledCardItem>
  )
}

type State = {
  showUpdateDialog: boolean
  activeItemInfo: any
  listSource: any[]
  isLoading: boolean
}

const initState = {
  showUpdateDialog: false,
  activeItemInfo: {},
  listSource: [],
  isLoading: true,
}

export default () => {
  const [state, setState] = useImmer<State>(initState)
  const appApis = getOrgAppApis()

  const { isLoading, showUpdateDialog, activeItemInfo, listSource } = state
  const isEdit = !!activeItemInfo.id

  const toggleDialog = (toggle, info = {}) => {
    setState((d) => {
      d.showUpdateDialog = typeof toggle === 'boolean' ? toggle : !d.showUpdateDialog
      d.activeItemInfo = info
    })
  }

  const fetchList = () => {
    setState((d) => {
      d.isLoading = true
    })
    appApis.orgListAppApi().then((source) => {
      setState((d) => {
        d.listSource = source
        d.isLoading = false
      })
    })
  }

  const updateDialogSchema = {
    type: 'dialog',
    show: showUpdateDialog,
    onClose: toggleDialog,
    data: activeItemInfo,
    title: isEdit ? '编辑应用' : '创建一个新应用',
    bodyClassName: 'p-b-none',
    body: {
      type: 'form',
      api: isEdit ? appApis.editApp : appApis.addApp,
      controls: AppControls,
    },
  }

  useEffect(() => {
    fetchList()
  }, [])

  useSubscriber(msgKey.updateOrgAppList, () => {
    toggleDialog(false)
    fetchList()
  })
  // TODO: 添加拖拽排序
  return (
    <S.StyledAppCards className="container">
      <h5 className="m-b-md">我的应用</h5>
      <div className="row no-gutters items-grid">
        <div className="col-lg-3">
          <div className="new-item" onClick={toggleDialog}>
            <i className="iconfont icon-plus m-b-sm" />
            <span>添加一个新应用</span>
          </div>
        </div>
        <Spinner overlay theme="cxd" size="lg" show={isLoading} />
        {listSource.map((item, index) => {
          return <CardItem key={index} item={item} appApis={appApis} toggleDialog={toggleDialog} />
        })}
      </div>
      <Amis schema={updateDialogSchema} />
    </S.StyledAppCards>
  )
}
