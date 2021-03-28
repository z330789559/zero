import { Renderer } from 'amis'
import { uuid } from 'amis/lib/utils/helper'
import React from 'react'

import { validCodeCss } from './styled'

const __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  const c = arguments.length; let r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc; let d
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') {r = Reflect.decorate(decorators, target, key, desc)}
  else {for (let i = decorators.length - 1; i >= 0; i-=1) {
    d = decorators[i]
    if (d) {
      r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
    }
  }}
  if( c > 3 && r){
    Object.defineProperty(target, key, r)
  }
  return r
}

 class ValidCode extends React.Component {
  constructor(props) {
      super(props)
      this.$wrapperRef = React.createRef()
      this.state={
        key:0,
      }
  }

  componentDidMount() {
      $(this.$wrapperRef.current).mouseup(this.updateCode.bind(this))
  }
 
  updateCode () {
    this.setState({
      key:uuid()
    })

  }

  render() {
      const { key} = this.state
      const {src=''}=this.props
      return (React.createElement(validCodeCss, {className:'code-img'},
         React.createElement('img',{ ref: this.$wrapperRef,src:`${ src}?${key}` })))
  }
}
 __decorate([
  Renderer({
    test: /(^|\/)valid-code$/,
    name: 'valid-code',
  })
], ValidCode)