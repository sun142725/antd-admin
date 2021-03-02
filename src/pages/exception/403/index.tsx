import { Link } from 'umi';
import { Result, Button } from 'antd';
import React from 'react';

export default () => (
  <Result
    status="403"
    title="403"
    style={{
      background: 'none',
    }}
    subTitle="Sorry, you don't have access to this page."
    extra={
      <div onClick={()=>history.go(-1)}>
        <Button type="primary">Back to pre Page</Button>
      </div>
    }
  />
);
