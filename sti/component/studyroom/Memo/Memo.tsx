// @ts-nocheck
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
// css
import widget from '../../../styles/Widget.module.css';
import memo from '../../../styles/Memo.module.css';
// mui
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// recoil
import { useRecoilState } from 'recoil';
import { MemoModalOpen } from '../../../lib/recoil/Modal';
import { memoBEState } from '../../../lib/recoil/memo';
//api
import { getMemo, putMemo } from '../../../lib/api/memo';

interface Test {}

const Memo: Test = () => {
  const nodeRef = useRef(null);

  const [memoOpen, setMemoOpen] = useRecoilState(MemoModalOpen);
  const [memos, setMemos] = useRecoilState(memoBEState);
  useEffect(() => {
    getMemo().then((res) => {
      setMemos(res.data);
      console.log('memo', res.data);
    });
  }, []);
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const saveMemo = () => {
    putMemo('dd').then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      {memoOpen ? (
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
                    setMemoOpen(false);
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
                rows={9}
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
              <Button variant="outlined" color="inherit" onClick={saveMemo}>
                SAVE
              </Button>
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
