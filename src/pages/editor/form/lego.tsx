
import React, { useEffect } from 'react';
import { Button,  Input, Form, DatePicker, Select, Modal } from 'antd';
import moment from 'moment';
import { connect } from 'umi';
import Common from './components/common/common';
import FllowJoin from './legoCom/FllowJoin'

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

  const cancel = () => {
    Modal.success({
      centered: true,
      maskClosable: true,
      okText: <span style={{display: 'none'}}>22</span>,
      cancelText: null,
      icon: false,
      content: <img src="https://www.baidu.com/img/flexible/logo/pc/result.png" alt=""/>
    })
  }
  const getValue = (key) => {
    return form.getFieldValue(key)
  }
  const setValues = (option: any)=>{
    form.setFieldsValue(option)
  }

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
        {/* <FllowJoin getValue={getValue} setValues={setValues} /> */}
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
          <Button style={{ marginLeft: 8 }} onClick={cancel}>取消</Button>
        </FormItem>
      </Form>
    </>
  );
};

export default connect(({ formDnd }: any) => ({
  weigets: formDnd.weigets,
}))(LegoPreview);
