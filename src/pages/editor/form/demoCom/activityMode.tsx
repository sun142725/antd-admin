import { useState } from 'react';

import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const FormItem = Form.Item;

export default (props) => {
  const [flag, setFlag] = useState();

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
        name="linkLists"
        rules={[
          {
            validator: async (_, linkLists) => {
              if (!linkLists || linkLists.length < 1) {
                return Promise.reject(new Error('跳转链接至少选择一个'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...formItemLayout}
                label={`签到跳转${index + 1}`}
                required={true}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: '跳转链接不可为空',
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="请输入跳转链接" style={{ width: '60%' }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
                <div>
                  当参与次数为0时，点击参与按钮可跳转至该页面；每日仅首次进入才可获得1次参与机会
                </div>
              </Form.Item>
            ))}
            <Form.Item wrapperCol = {{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 10, offset: 7 },
                }}>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                增加跳转链接
              </Button>
              <div>设置多个签到跳转，用户点击签到时根据跳转页1、2、3序列跳转，依次类推</div>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};
