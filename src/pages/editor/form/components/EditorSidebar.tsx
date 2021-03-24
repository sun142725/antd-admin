import { useCallback, useEffect, useState } from 'react';
import { connect } from 'umi';
import styles from '../style.less';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import config from 'config/config';

const Container = function (props) {
  const { dispatch, modifyId, weigets } = props;
  const [weiget, setWeiget] = useState({ config: {}, edit: [] });
  const [slideFrom] = Form.useForm();
  const onFormLayoutChange = (changedValues: any, allValues: any) => {
    console.log('onFormLayoutChange', changedValues, allValues);
    dispatch({
      type: 'formDnd/updateWeiget',
      param: {
        ...weiget,
        config: { ...weiget.config, ...allValues },
      },
    });
  };
  const onFieldsChange = (changeFields: any, allFields: any) => {
    console.log('onFieldsChange', changeFields, allFields);
    // dispatch({
    //   type: 'formDnd/pushWeiget',
    //   param: {...allFields}
    // })
  };
  const delCurWeiget = () => {
    dispatch({
      type: 'formDnd/delWeiget'
    })
  };
  const renderCom = useCallback(
    (type: string, option: any, item: any) => {
      console.log('type', type);
      switch (type) {
        case 'Text':
          return <Input />;
        case 'CheckBox':
          return <Checkbox.Group>
            {option.map((v, i)=><Checkbox key={i} value={v.value}>{v.title}</Checkbox>)}
          </Checkbox.Group>
        case 'Switch':
          return <Switch defaultChecked={weiget?.config[item.key]}/>;
        default:
          return <span>未配置的渲染类型</span>;
      }
    },
    [weiget],
  );
  useEffect(() => {
    const weiget = weigets.find((item) => item.rId === modifyId);
    setWeiget(weiget);
    slideFrom.setFieldsValue(weiget?.config);
  }, [modifyId]);

  return (
    <>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        form={slideFrom}
        size={'small'}
        layout="vertical"
        initialValues={weiget?.config}
        onValuesChange={onFormLayoutChange}
        onFieldsChange={onFieldsChange}
      >
        {weiget?.edit.map((item, index) => (
          <Form.Item key={index} label={item.name} name={item.key}>
            {/* <Input /> */}
            {renderCom(item.type, item.option, item)}
          </Form.Item>
        ))}
        {modifyId && <Button danger onClick={delCurWeiget}>
          删除
        </Button>}
      </Form>
    </>
  );
};

export default connect(({ formDnd }: any) => ({
  weigets: formDnd.weigets,
  modifyId: formDnd.modifyId,
}))(Container);
