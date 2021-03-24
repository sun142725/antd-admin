import { Col, Row, Modal } from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Index from './components';
import ResourceDrag from './components/ResourceDrag';
import TargetBox from './components/TargetBox';
import EditorSiderbar from './components/EditorSidebar'
import styles from './style.less';
import Draggable, { DraggableCore } from 'react-draggable'
import Demo from './demoForm'
import Lego from './lego'

const TestDnd = (props: any) => {
  const { weigets } = props
  const [preview, setPreview] = useState(false)
  const showJson = ()=>{
    Modal.info({
      content: JSON.stringify(weigets)
    })
  }
  return (
    <PageContainer content="一个form表单的拖拽">
      <div className={styles.editor}>
        <Row className={styles.editorHd}>
          <Col span={24}>
            <button onClick={()=>setPreview(!preview)}>{preview ? "展示编辑界面": "预览"}</button>
            <button>清空</button>
            <button onClick={showJson}>查看json</button>
          </Col>
        </Row>
        {preview && <Lego />}
        {!preview && (<Row className={styles.editorBd}>
          <DndProvider backend={HTML5Backend}>
            <Col span={4} className="editorSidebar">
              <ResourceDrag />
            </Col>
            <Col span={14} className="editorContent">
              <TargetBox />
            </Col>
            <Col span={6} className={styles.editorSidebar}>
               <EditorSiderbar />
            </Col>
          </DndProvider>
        </Row>)}
        221
      </div>
    </PageContainer>
  );
};

export default connect(({ formDnd }: any) => ({
  weigets: formDnd.weigets,
}))(TestDnd);
