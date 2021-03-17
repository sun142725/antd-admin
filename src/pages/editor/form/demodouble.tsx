import { useState } from 'react'

import { Form, Switch, Radio } from 'antd'

const FormItem = Form.Item

export default (props)=>{
  const { field0, field1 } = props
const [ flag, setFlag] = useState()
return (
  <>
   <FormItem {...field0["__config__"]}>
      <Radio.Group
       onChange={(e) => {
            setFlag(e.target.value);
          }}>
        <Radio value="A">微信昵称</Radio>
        <Radio value="b">真实姓名</Radio>
        <Radio value="C">手机号</Radio>
        <Radio value="D">邮箱</Radio>
        <Radio value="E">微信号</Radio>
        <Radio value="F">QQ号</Radio>
        <Radio value="G">邮寄地址</Radio>
        <Radio value="H">微信号</Radio>
      </Radio.Group>
    </FormItem>
    {flag==="C" && <FormItem {...field1["__config__"]}>
      <Switch
        />
    </FormItem>
    }
  </>
)
}
