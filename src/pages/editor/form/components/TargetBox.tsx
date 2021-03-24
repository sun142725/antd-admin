import { useEffect, useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Form } from 'antd'
import { getComponentByName } from './source';
import { connect } from 'umi';
import Common from './common/common';
import Props from './common/props/index';
import WeigetJson from './common/props/weigetJson';
import styles from '../style.less';
import Draggable from 'react-draggable';
import { relativeTimeThreshold } from 'moment';
import update from 'immutability-helper';
import { Card } from './Card';
import weigetJson from './common/props/weigetJson';

const getJson = (id: string) => {
  return weigetJson.find((v) => v.id === id) || {};
};
const TargetBox = (props: any) => {
  const { weigets, dispatch } = props;
  const [sellectIndex, setSelectIndex] = useState('');
  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ['component'],
      drop(item: any) {
        const x = item.x - 212;
        const y = item.y - 231;
        console.log(item, x, y);
        console.log(item, { ...getJson(item.id), x, y });

        dispatch({
          type: 'formDnd/pushWeiget',
          param: Object.assign(getJson(item.id), x, y, {name: item.name}),
        });
        return undefined;
      },
      hover(item, monitor) {
        // console.log('monitor.getClientOffset', monitor.getClientOffset())
        // console.log('monitor.getDifferenceFromInitialOffset', monitor.getDifferenceFromInitialOffset())
        // console.log('monitor.getInitialClientOffset', monitor.getInitialClientOffset())
        // console.log('monitor.getInitialSourceClientOffset', monitor.getInitialSourceClientOffset())
        // console.log('monitor.getSourceClientOffset', monitor.getSourceClientOffset())
        return {
          item: Object.assign(item, monitor.getClientOffset()),
        };
      },
      collect: (monitor) => {
        // console.log('monitor.getClientOffset', monitor.getClientOffset())
        // console.log('monitor.getDifferenceFromInitialOffset', monitor.getDifferenceFromInitialOffset())
        // console.log('monitor.getInitialClientOffset', monitor.getInitialClientOffset())
        // console.log('monitor.getInitialSourceClientOffset', monitor.getInitialSourceClientOffset())
        // console.log('monitor.getSourceClientOffset', monitor.getSourceClientOffset())
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [],
  );
  const getOffset = async () => {
    const targetBox: Element | null = document.querySelector('.targetBox');
    const { x, y }: any = await targetBox?.getBoundingClientRect();
    setOffset({ x, y });
  };
  useEffect(() => {
    getOffset();
  }, []);
  useEffect(()=>{
    console.log('weigets', weigets)
  }, [weigets])
  window.onresize = () => {
    getOffset();
  };
  const opacity = isOver ? 1 : 0.7;
  const handleClick = (item: any, index: any) => {
    setSelectIndex(item.rId);
    dispatch({
      type: 'formDnd/setModifyId',
      payload: item.rId,
    });
  };
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = weigets[dragIndex];
      console.log(
        '触发',
        update(weigets, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      );
      dispatch({
        type: 'formDnd/saveWeigets',
        payload: update(weigets, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      });
    },
    [weigets],
  );
  return (
    <div
      className="targetBox"
      class="targetBox"
      ref={drop}
      style={{ height: '100%', opacity }}
      role="TargetBox"
    >

      <Form
        style={{ marginTop: 8 }}
        name="form"
        initialValues={{ public: '1' }}
        labelCol={{ span: 3 }}
        wrapperCol={{span: 20}}
      >
      {weigets.map((item, index)=><div key={item.rId} onClick={() => handleClick(item, index)} style={sellectIndex === item.rId ? { boxShadow: '0 0 5px 2px blue' } : {}}>
<Card key={item.rId} index={index} id={item.rId} moveCard={moveCard} >
            <Common
              {...item}
            />
          </Card>
      </div>)}
      </Form>

      {/* {weigets.map((item: any, index: any) =>
        1 ? (
          <Card key={item.rId} index={index} id={item.rId} moveCard={moveCard}>
            <Common
              is={item.name}
              {...item}
              class="handle"
              style={sellectIndex === index ? { boxShadow: '0 0 5px 2px blue' } : {}}
              onClick={() => handleClick(item, index)}
            />
          </Card>
        ) : (
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
              {...item}
              class="handle fix"
              className={styles.fix}
              style={sellectIndex === index ? { boxShadow: '0 0 5px 2px blue' } : {}}
              onClick={() => handleClick(item, index)}
            />
          </Draggable>
        ),
      )} */}
    </div>
  );
};

export default connect(({ formDnd }: any) => ({
  weigets: formDnd.weigets,
}))(TargetBox);
