import { Form, Input, Button, Table, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const { Option } = Select

export default (props) => {
  const { type, nameLabel, prizeLabel, probabilityLabel, stateLabel, help, isShowAddBtn, prizes } = props
  const columns = [
  {
    title: nameLabel,
    render: (val, result, index)=>`${type === 0? '道具' : '奖品'}${index+1}`
  },
  {
    title: prizeLabel,
    render: (val, result)=>(<FormItem name={[result.name, "prize_id"]} noStyle>
      <Select defaultValue="1">
        <Option value="1">奖品1</Option>
        <Option value="2">奖品2</Option>
        <Option value="3">谢谢参与</Option>
      </Select>
    </FormItem>)
  },
  {
    title: probabilityLabel,
    render: (val, result)=>(<FormItem name={[result.name, "probability_value"]} noStyle>
      <Input addonAfter={"%"}/>
    </FormItem>)
  },
];
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  return (
    <>
      <Form.List
      initialValue={prizes}
      {...formItemLayout}
        name="prizes">
        {(fields, { add, remove }, { errors }) => (
          <>
          {console.log('fields', fields)}
            {fields.length > 0 && <Table columns={columns} dataSource={fields} pagination={false} locale={undefined} />}
            <Form.Item wrapperCol = {{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 10, offset: 7 },
                }}>
              {isShowAddBtn && <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>增加奖项</Button>}
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};
