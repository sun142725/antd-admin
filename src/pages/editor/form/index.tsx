import { Col, Row } from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Index from './components';
import ResourceDrag from './components/ResourceDrag';
import TargetBox from './components/TargetBox';
import EditorSiderbar from './components/EditorSidebar'
import styles from './style.less';
import Draggable, { DraggableCore } from 'react-draggable'

export default () => {
  return (
    <PageContainer content="一个form表单的拖拽">
      <div className={styles.editor}>
        <Row className={styles.editorHd}>
          <Col span={24}>
            <button>最终展示</button>
            <button>清空</button>
            <button>查看json</button>
          </Col>
        </Row>
        <Row className={styles.editorBd}>
          <DndProvider backend={HTML5Backend}>
            <Col span={4} className="editorSidebar">
              <ResourceDrag />
            </Col>
            <Col span={16} className="editorContent">
              <TargetBox />
            </Col>
            <Col span={4} className={styles.editorSidebar}>
               <EditorSiderbar />
            </Col>
          </DndProvider>
        </Row>
        221
      </div>
    </PageContainer>
  );
};
