import { useState } from 'react';

import { Form, Switch, Checkbox, Input } from 'antd';
import DemoDouble from '../demodouble'
const FormItem = Form.Item;

  const getProps = (data) => {
    const { __config__, weigetType, weigetName, ...res } = data;
    return res;
  };
export default (props: any) => {
  const createCom = (weigetType): ReactNode=>{
    switch(weigetType){
      case 'basic':
        return <FormItem {...props['__config__']}>
            <Input {...getProps(props)} />
          </FormItem>
      case 'complex':
        return <DemoDouble {...props} />
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
    {createCom(props.weigetType)}
    </>
  )
}

