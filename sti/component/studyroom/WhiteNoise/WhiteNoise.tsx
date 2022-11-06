// @ts-nocheck
import React from 'react';
// css
import widget from '../../../styles/Widget.module.css';
import todo from '../../../styles/TodoList.module.css';
// mui
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';
// recoil
import { useRecoilState } from 'recoil';
import { NoiseModalOpen } from '../../../lib/recoil/Modal';

interface Test {}

const WhiteNoise: Test = () => {
  const nodeRef = React.useRef(null);
  const [noiseOpen, setNoiseOpen] = useRecoilState(NoiseModalOpen);
  return (
    <>
      {noiseOpen ? (
        <Draggable nodeRef={nodeRef} defaultPosition={{ x: 800, y: 300 }}>
          <div ref={nodeRef} className={widget.widget}>
            <div className={widget.widgetHeader}>
              <div className={widget.widgetTitle}>
                <img
                  src={`/dday.png`}
                  style={{ width: '20px', height: '20px', marginRight: '5px' }}
                ></img>
                <b>Noise</b>
              </div>
              <div className={widget.widgetCloseBtnContainer}>
                <button
                  id={widget.widgetCloseBtn}
                  onClick={() => {
                    setNoiseOpen(false);
                  }}
                >
                  <img src="/minus.png" width="18px"></img>
                </button>
              </div>
            </div>
            <div className={(widget.widgetContent, todo.todoWidgetContent)}>
              content
            </div>
            <div className={widget.widgetFooter}>footer</div>
          </div>
        </Draggable>
      ) : null}
    </>
  );
};

export default WhiteNoise;
