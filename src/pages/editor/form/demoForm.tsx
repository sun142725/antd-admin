import React, { useEffect } from 'react';
import { Modal, Button, message, Input, Form, DatePicker, Select } from 'antd';
import { billCategoryType, billType, getTitleByValue } from '@/utils/type';
import { insert, InsertParamsType, UpdateParamsType, update } from '@/services/bill';
import moment from 'moment';
import DemoCom from './demoCom/index';
import DemoActivity from './demoCom/activityMode'
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const DetailModal: React.FC<any> = React.memo(() => {
  const [form] = Form.useForm();
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

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };

  const onFinish = (values: InsertParamsType) => {
    console.log(values);
    values.gmt_created = moment(values.gmt_created).format('YYYY-MM-DD HH:mm:ss');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {};

  const dataJson = {
    formRef: 'elForm',
    formModel: 'formData',
    labelAlign: 'left',
    fields: [
      {
        __config__: {
          label: '参与次数',
          name: 'firstJoin',
          required: true,
          rules: [{ required: true, message: '请输入初次参与次数' }],
          labelCol: {
            xs: { span: 24 },
            sm: { span: 7 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
            md: { span: 10 },
          },
        },
        placeholder: '請輸入初次参与次数',
        weigetType: 'basic',
        weigetName: 'input',
      },
      {
        __config__: {
          label: '名称',
          name: 'name',
          required: true,
          rules: [{ required: true, message: '请输入名称' }],
          labelCol: {
            xs: { span: 24 },
            sm: { span: 7 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
            md: { span: 10 },
          },
        },
        placeholder: '請輸入名称',
        weigetType: 'basic',
        weigetName: 'input',
      },
      {
        field0: {
          __config__: {
            label: '兑换奖填写资料',
            name: 'isSelectPeople',
            rules: [{ required: true, message: '请选择人群' }],
            labelCol: {
              xs: { span: 24 },
              sm: { span: 7 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 12 },
              md: { span: 10 },
            },
          },
          weigetType: 'basic',
          weigetName: 'radio',
        },
        field1: {
          __config__: {
            label: '手机号验证',
            name: 'verifyPhone',
            labelCol: {
              xs: { span: 24 },
              sm: { span: 7 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 12 },
              md: { span: 10 },
            },
          },
          checked: false,
          weigetType: 'basic',
          weigetName: 'Switch',
        },
        weigetType: 'complex',
        weigetName: 'selectPeople',
      },
    ],
  };
  const renderFunction = () => {
    return {
      ref: dataJson.formRef,
      name: dataJson.formModel,
      labelAlign: dataJson.labelAlign,
    };
  };
  const getJson = () => {};
  const getProps = (data) => {
    const { __config__, weigetType, weigetName, ...res } = data;
    return res;
  };

  return (
    <>
      <Form
        hideRequiredMark
        style={{ marginTop: 8 }}
        form={form}
        name={dataJson.formModel}
        initialValues={{ public: '1' }}
        labelCol={{ span: 3 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
      >
        {dataJson.fields?.map((field, index) => (
          <DemoCom key={index} {...field} />
        ))}
        <DemoActivity />
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
});

export default DetailModal;
