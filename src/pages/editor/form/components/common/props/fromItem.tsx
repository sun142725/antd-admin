import { Form, Input } from 'antd'

const FormItem = Form.Item

export default (props: any)=>{
  const { label, key, placeholder, required } = props
  return (<FormItem label={label} name={key} rules={[{required: !!required, message: `请输入${label}`}]}>
            <Input placeholder={placeholder} />
          </FormItem>)
}
