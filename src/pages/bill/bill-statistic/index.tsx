import React, { FC, useEffect, useState } from 'react';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';


const BillList: FC = (props) => {
  return (
    <PageContainer content="这是我的账单大概">
      统计数值
    </PageContainer>
  );
};

export default connect(() => ({}))(BillList);
