
import { Form, Input } from 'antd'

const FormItem = Form.Item

export default (props: any)=>{
  const { label, name, placeholder, required, itemConfig,  ...config} = props
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 9 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 15 },
      md: { span: 10 },
    },
  };
  return (<FormItem {...formItemLayout} label={label} name={name} rules={[{required: !!required, message: `请输入${label}`}]} {...itemConfig}>
            <Input placeholder={placeholder} {...config} />
          </FormItem>)
}
