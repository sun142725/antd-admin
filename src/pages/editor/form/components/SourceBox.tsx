import { useState, useCallback, useMemo } from 'react';
import { useDrag, DragPreviewImage } from 'react-dnd';
import { Colors } from './Colors';
const style = {
    border: '1px dashed gray',
    padding: '0.5rem',
    margin: '0.5rem',
};

export const SourceBox = ({ name, id, children }: any) => {
    const [forbidDrag, setForbidDrag] = useState(false);
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        item: { type: "component", name, id },
        canDrag: !forbidDrag,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [forbidDrag, name]);
    const onToggleForbidDrag = useCallback(() => {
        setForbidDrag(!forbidDrag);
    }, [forbidDrag, setForbidDrag]);
    const backgroundColor = useMemo(() => {
        switch (name) {
            case Colors.YELLOW:
                return 'lightgoldenrodyellow';
            case Colors.BLUE:
                return 'lightblue';
            default:
                return 'lightgoldenrodyellow';
        }
    }, [name]);
    const containerStyle = useMemo(() => ({
        ...style,
        backgroundColor,
        opacity: isDragging ? 0.4 : 1,
        cursor: forbidDrag ? 'default' : 'move',
    }), [isDragging, forbidDrag, backgroundColor]);
    return (<>
      <DragPreviewImage connect={preview} src="https://www.baidu.com/img/flexible/logo/pc/result.png" />
      <div ref={drag} style={containerStyle} role="SourceBox" data-name={name}>
        {children}
      </div>
    </>);
};
