
import React, { useEffect } from 'react';
import { Button,  Input, Form, DatePicker, Select } from 'antd';
import moment from 'moment';
import DemoActivity from './demoCom/activityMode'
import { connect } from 'umi';
import Common from './components/common/common';
import SloganCtrl from './legoCom/SloganCtrl'

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const LegoPreview = (props: any) => {
  const [form] = Form.useForm();
  const { weigets } = props

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };

  const onFinish = (values: any) => {
    alert(JSON.stringify(values))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {};


  return (
    <>
      <Form
        style={{ marginTop: 8 }}
        form={form}
        name="form"
        labelCol={{ span: 3 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
      >
        {/* <DemoActivity /> */}
        <SloganCtrl />
      {weigets.map((item, index)=>
            <Common
            key={index}
              {...item}
            />
      )}
        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          {/* loading={submitting} */}
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button style={{ marginLeft: 8 }}>取消</Button>
        </FormItem>
      </Form>
    </>
  );
};

export default connect(({ formDnd }: any) => ({
  weigets: formDnd.weigets,
}))(LegoPreview);
