
import React, { ReactNode, useEffect, useState } from 'react'
import { Button, Input, Checkbox, Switch } from 'antd'
import styles from '../../style.less';


interface props {
  is?: String
}

export default (props: any) => {
  const createCom = (is: string): ReactNode=>{
    switch(is){
      case 'Button':
        return <Button {...props}>{props.value}</Button>
      case 'Input':
        return <Input {...props} />
      case 'Checkbox':
        return <Checkbox {...props} />
      case 'Switch':
        return <Switch {...props} />
      default:
        return <span></span>
    }
  }
  return (
    <>
    {createCom(props.is)}
    </>
  )
}
