
import React, { ReactNode, useEffect, useState, lazy, Suspense } from 'react'
import { Button, Input, Checkbox, Spin } from 'antd'
import styles from '../../style.less';
import FormItem from './props/fromItem'

const LimitDaily = lazy(()=>import('../../legoCom/LimitDaily'));
const WinDailyTimes = lazy(()=>import('../../legoCom/WinDailyTimes'));
const SloganCtrl = lazy(()=>import('../../legoCom/SloganCtrl'));


interface props {
  is?: String
}

export default (props: any) => {
  const createCom = (name: string): ReactNode=>{
    console.log('is', name)
    switch(name){
      case 'Button':
        return <Button {...props}>{props.value}</Button>
      case 'Input':
        return <Input {...props} />
      case 'Checkbox':
        return <Checkbox {...props} />
      case 'Switch':
        return <FormItem {...props} />
      case 'limit_daily':
        return <LimitDaily {...props.config} />
      case 'win_daily_times':
        return <WinDailyTimes {...props.config} />
      case 'sloganCom':
        return <SloganCtrl {...props.config} />
      default:
        return <span style={{color: 'red'}}>!!!未配置的渲染类型</span>
    }
  }
  return (
    <>
      <Suspense fallback={<Spin />}>{createCom(props.name)}</Suspense>
    </>
  )
}
