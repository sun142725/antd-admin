import React, { FC, Suspense, useEffect, useState } from 'react';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import styles from './style.less';
const SalesCard = React.lazy(() => import('./components/SalesCard'));
import { getTimeDistance } from '../../dashboard/analysis/utils/utils';
import { getBillStatic, calcBillByCurrentMonth } from '@/services/bill'
import { billCategoryType, getTitleByValue } from '@/utils/type';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

const BillList: FC = (props) => {
  const [rangePickerValue, setRangePickerValue] = useState(getTimeDistance('week'))
  const [salesData, setsalesData] = useState([])
  const [salesMonth, setSalesMonth] = useState([])
  const [type, setType] = useState('1')
  const isActive = (type: 'today' | 'week' | 'month' | 'year') => {
    if (!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0] as moment.Moment, 'day') &&
      rangePickerValue[1].isSame(value[1] as moment.Moment, 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

// 获取统计
  const getStatic = ()=>{
    getBillStatic({
      startTime: rangePickerValue![0]?.format('YYYY-MM-DD') + " 00:00:00",
      endTime: rangePickerValue![1]?.format('YYYY-MM-DD') + " 23:59:59",
      type: type
    }).then(res=>{
      setsalesData(res.data.map((v:any)=>{
        v.date = v.date.replace(/\-/g, "~")
        v.category = getTitleByValue(billCategoryType, v.category)
        return v
      }))
    })
  }
  // 获取月度统计
  const getcalcBillByCurrentMonth = async ()=>{
    const result = await calcBillByCurrentMonth({type})
    setSalesMonth(result.data)
  }
  const selectDate = (type: 'today' | 'week' | 'month' | 'year') => {
    setRangePickerValue(getTimeDistance(type))
  };

  useEffect(()=>{
    if(rangePickerValue){
      getStatic()
    }
  }, [rangePickerValue, type])

  useEffect(()=>{
    getcalcBillByCurrentMonth()
  }, [type])
  return (
    <PageContainer content="这是我的账单大概">
      统计数值
      <Suspense fallback={null}>
        <SalesCard
          rangePickerValue={rangePickerValue}
          salesData={salesData}
          isActive={isActive}
          handleRangePickerChange={(rangePickerValue: RangePickerValue) => setRangePickerValue(rangePickerValue)}
          loading={false}
          selectDate={selectDate}
          tabChange={val=>setType(val)}
          salesMonth={salesMonth}
        />
      </Suspense>
    </PageContainer>
  );
};

export default connect(() => ({}))(BillList);
