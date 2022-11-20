// @ts-nocheck

import React, { useState, useEffect } from 'react';

// css
import widget from '../../../styles/Widget.module.css';

// mui
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';

// recoil
import { useRecoilState } from 'recoil';
import { DdayModalOpen } from '../../../lib/recoil/Modal';

import DdayContent from './DdayContent';
import DdayInput from './DdayInput';

interface Test {}

const Dday: Test = () => {
  const nodeRef = React.useRef(null);
  const [ddayOpen, setDdayOpen] = useRecoilState(DdayModalOpen);
  return (
    <>
      {ddayOpen ? (
        <Draggable nodeRef={nodeRef} defaultPosition={{ x: 350, y: 200 }}>
          <div ref={nodeRef} className={widget.widget}>
            <div className={widget.widgetHeader}>
              <div className={widget.widgetTitle}>
                <img
                  src={`/dday.png`}
                  style={{ width: '20px', height: '20px', marginRight: '5px' }}
                ></img>
                <b>Dday</b>
              </div>
              <div className={widget.widgetCloseBtnContainer}>
                <button
                  id={widget.widgetCloseBtn}
                  onClick={() => {
                    setDdayOpen(false);
                  }}
                >
                  <img src="/minus.png" width="18px"></img>
                </button>
              </div>
            </div>
            <div className={widget.widgetContent}>
              <DdayContent />
            </div>
            <div className={widget.widgetFooter}>
              <DdayInput />
            </div>
          </div>
        </Draggable>
      ) : null}
    </>
  );
};

export default Dday;
