import { useState } from 'react';
import { connect } from 'umi';
import styles from '../style.less'
import { Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch, } from 'antd'

const Container = function(props) {
  const { dispatch } = props
  const onFormLayoutChange = (changedValues: any, allValues: any) => {
    console.log('onFormLayoutChange', changedValues, allValues)
    dispatch({
      type: 'formDnd/updateWeiget',
      param: {...allValues}
    })
  };
  const onFieldsChange = (changeFields: any, allFields: any) => {
    console.log('onFieldsChange', changeFields, allFields)
    // dispatch({
    //   type: 'formDnd/pushWeiget',
    //   param: {...allFields}
    // })
  }
    return (<>
			<Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{}}
        onValuesChange={onFormLayoutChange}
        onFieldsChange={onFieldsChange}
      >
        <Form.Item label="val" name="value">
          <Input />
        </Form.Item>
      </Form>
		</>);
};

export default connect(({ formDnd }: any) => ({
  weigets: formDnd.weigets,
  modifyId: formDnd.modifyId
}))(Container);
