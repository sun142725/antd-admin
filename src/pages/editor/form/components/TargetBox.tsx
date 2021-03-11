import { useEffect, useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { getComponentByName } from './source';
import { connect } from 'umi';
import Common from './common/common';
import Props from './common/props/index';
import styles from '../style.less';
import Draggable from 'react-draggable'
import { relativeTimeThreshold } from 'moment';
import update from 'immutability-helper';
import { Card } from './Card'


const TargetBox = (props: any) => {
  const { weigets, dispatch } = props;
  const [sellectIndex, setSelectIndex] = useState('');
  const [offset, setOffset] = useState({
    x: 0,
    y: 0
  })
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ['component'],
      drop(item: any) {
        const x = item.x-212
        const y = (item.y-231)
        console.log(item, x, y);
        dispatch({
          type: 'formDnd/pushWeiget',
          param: {...Props[item.name] , x, y},
        });
        return undefined;
      },
      hover(item, monitor){
        // console.log('monitor.getClientOffset', monitor.getClientOffset())
        // console.log('monitor.getDifferenceFromInitialOffset', monitor.getDifferenceFromInitialOffset())
        // console.log('monitor.getInitialClientOffset', monitor.getInitialClientOffset())
        // console.log('monitor.getInitialSourceClientOffset', monitor.getInitialSourceClientOffset())
        // console.log('monitor.getSourceClientOffset', monitor.getSourceClientOffset())
        return {
          item: Object.assign(item, monitor.getClientOffset())
        }

      },
      collect: (monitor) => {
        // console.log('monitor.getClientOffset', monitor.getClientOffset())
        // console.log('monitor.getDifferenceFromInitialOffset', monitor.getDifferenceFromInitialOffset())
        // console.log('monitor.getInitialClientOffset', monitor.getInitialClientOffset())
        // console.log('monitor.getInitialSourceClientOffset', monitor.getInitialSourceClientOffset())
        // console.log('monitor.getSourceClientOffset', monitor.getSourceClientOffset())
        return ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        })
      },
    }),
    [],
  );
  const getOffset = async ()=>{
    const targetBox: Element|null = document.querySelector('.targetBox')
    const {x, y}: any = await targetBox?.getBoundingClientRect()
    setOffset({x, y})
  }
  useEffect(()=>{
    getOffset()
  }, [])
  window.onresize = () => {
    getOffset()
  }
  const opacity = isOver ? 1 : 0.7;
  const handleClick = (item: any, index: any) => {
    setSelectIndex(index);
    dispatch({
      type: 'formDnd/setModifyId',
      payload: index ,
    });
  };
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = weigets[dragIndex];
    console.log('触发', update(weigets, {
      $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
      ],
  }))
    dispatch({
      type: 'formDnd/saveWeigets',
      payload: update(weigets, {
        $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
        ],
    })
    });

}, [weigets]);
  return (
    <div className={"targetBox"} class="targetBox" ref={drop} style={{ height: '100%', opacity }} role="TargetBox">
      {weigets.map((item: any, index: any) => !item.fixed ? (<Card key={item.id} index={index} id={item.id} moveCard={moveCard}>
        <Common
              is={item.name}
              {...item}
              class="handle"
              style={(sellectIndex === index ? { boxShadow: '0 0 5px 2px blue' } : {})}
              onClick={() => handleClick(item, index)}
            />
      </Card>) : (
        <Draggable
          handle=".handle"
          bounds="parent"
          defaultPosition={{ x: item.x, y: item.y }}
          // position={null}
          key={index}
          grid={[25, 25]}
          scale={1}
        >
            <Common
              is={item.name}
              {...item}
              class="handle fix"
              className={styles.fix}
              style={(sellectIndex === index ? { boxShadow: '0 0 5px 2px blue' } : {})}
              onClick={() => handleClick(item, index)}
            />
        </Draggable>
      ))}
    </div>
  );
};

export default connect(({ formDnd }: any) => ({
  weigets: formDnd.weigets,
}))(TargetBox);
