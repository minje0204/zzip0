// @ts-nocheck
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
// css
import widget from '../../../styles/Widget.module.css';
import memo from '../../../styles/Memo.module.css';
// mui
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';
// recoil
import { useRecoilState } from 'recoil';
import { MemoModalOpen } from '../../../lib/recoil/Modal';
import { noiseBEState } from '../../../lib/recoil/noise';
//api
import { getNoise } from '../../../lib/api/noise';

interface Test {}

const Memo: Test = () => {
  const nodeRef = useRef(null);
  const [noiseOpen, setNoiseOpen] = useRecoilState(MemoModalOpen);
  const [noises, setNoises] = useRecoilState(noiseBEState);
  useEffect(() => {
    getNoise().then((res) => console.log(res));
  });
  const [value, setValue] = useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      {noiseOpen ? (
        <Draggable nodeRef={nodeRef} defaultPosition={{ x: 800, y: 0 }}>
          <div ref={nodeRef} className={(widget.widget, memo.widget)}>
            <div className={widget.widgetHeader}>
              <div className={widget.widgetTitle}>
                <img
                  src={`/edit.png`}
                  style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '5px'
                  }}
                ></img>
                <b>Notes</b>
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
            <div className={(widget.widgetContent, memo.WidgetContent)}>
              <TextField
                id="outlined-multiline-flexible"
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
                placeholder="기억보다 기록을"
                multiline
                maxRows={10}
                rows={11}
                value={value}
                onChange={handleChange}
                sx={{
                  width: '330px',
                  m: 0,
                  p: 0,
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': { borderColor: 'transparent' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'lightgray'
                    }
                  },
                  '& .MuiOutlinedInput-root:hover': {
                    '& > fieldset': {
                      borderColor: 'lightgray'
                    }
                  }
                }}
              />
            </div>
          </div>
        </Draggable>
      ) : null}
    </>
  );
};

const NoiseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Memo;
