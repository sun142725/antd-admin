import { memo } from 'react';
import { Tooltip } from 'antd'
import { SourceBox } from './SourceBox';
import { dataSource } from './source'
export default memo(function Container() {
    return (<>
			<div style={{ overflow: 'hidden'}}>
        {
          dataSource.map((v, i)=>(<div key={i}>
            <div>{v.title}</div>
            <div className="content">
              {v.weigets?.map((item: any ,index: number)=><SourceBox key={index} name={item.name} id={item.id}><Tooltip title={item.desc}>{item.name}</Tooltip></SourceBox>)}
            </div>
          </div>))
        }
			</div>
		</>);
});
