// @ts-nocheck

import React, { useState } from 'react';
import Draggable from 'react-draggable';
import todo from '../../styles/TodoList.module.css';
import widget from '../../styles/Widget.module.css';
import styles from '../../styles/Home.module.css';
import TimerStudy from './TimerStudy';
import TimerTodo from './TimerTodo';
import TimerExam from './TimerExam';

import TimerExamFooter from './TimerExamFooter';
import TimerTodoList from './TimerTodoList';
import { Tabs, Tab, Box, Button } from '@mui/material';

import TimerTodoList from './TimerTodoList';
import { Tabs, Tab, Box } from '@mui/material';


interface Test {}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
const Timer: Test = () => {
  function timerContent(n: number) {
    return [<TimerStudy />, <TimerTodo />, <TimerExam />][n];
  }
  function timerFooter(n: number) {
    return [<></>, <TimerTodoList />, <TimerExam />][n];
  }
  const [choosedTab, setChoosedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setChoosedTab(newValue);
  };

  const [examFooterOpen, setExamFooterOpen] = useState(false);
  const [clickedIdx, setClickedIdx] = useState(-1);
  return (
    <>
      <Draggable>
        <div className={widget.widget}>
          <div className={widget.widgetHeader}>
            <div className={widget.widgetTitle}>
            <img
            src={`/stopwatch.png`}
            style={{ width: '20px', height: '20px', marginRight: '5px' }}
          ></img>
          <b>TIMER</b></div>
            <div className={widget.widgetCloseBtnContainer}>
              <button id={widget.widgetCloseBtn}>
                <img src="minus.png" width="18px"></img>
              </button>
            </div>
          </div>
          <div className={widget.widgetContent}>
            <TabPanel value={choosedTab} index={choosedTab}>
              {timerContent(choosedTab)}
            </TabPanel>
            <Tabs
              value={choosedTab}
              onChange={handleChange}
              aria-label="basic tabs example"
              textColor="primary.dark"
              indicatorColor="secondary"
              centered
            >
              <Tab
                label="순공"
                {...a11yProps(0)}
                onClick={() => setClickedIdx(0)}
              />
              <Tab
                label="목표"
                {...a11yProps(1)}
                onClick={() => setClickedIdx(1)}
              />
              <Tab
                label="수능"
                {...a11yProps(2)}
                onClick={() => setClickedIdx(2)}
              />
              <Button
                variant="text"
                onClick={(e) => {
                  if (clickedIdx == 2) {
                    setExamFooterOpen(!examFooterOpen);
                  }
                }}
                sx={{ color: 'primary.dark' }}
              >
                {examFooterOpen ? <span>▲</span> : <span>▼</span>}
              </Button>
            </Tabs>
          </div>
          <div className={widget.widgetFooter}>

            <TabPanel value={choosedTab} index={choosedTab}>
              {timerFooter(choosedTab)}
            </TabPanel>

          </div>
        </div>
      </Draggable>
    </>
  );
};

export default Timer;
