import React from 'react'

import { LibCssProps } from '@ovine/core/lib/components/amis/lib_css'

export declare type ValidCodeProps = LibCssProps;

export declare class ValidCode extends React.Component<ValidCodeProps & { src: string }>{
  render(): JSX.Element;
}