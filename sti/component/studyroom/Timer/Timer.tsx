// @ts-nocheck

import React, { useState } from 'react';
import Draggable from 'react-draggable';
import widget from '../../../styles/Widget.module.css';
import TimerStudy from './TimerStudy';
import TimerTodo from './TimerTodo/TimerTodo';
import TimerExam from './TimerExam';

import TimerExamFooter from './TimerExamFooter';
// import TimerTodoList from '../TimerTodoList';
import { Tabs, Tab, Box, Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { TimerModalOpen } from '../../../lib/recoil/Modal';

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
  const [timerOpen, setTimerOpen] = useRecoilState(TimerModalOpen);
  function timerContent(n: number) {
    return [<TimerStudy />, <TimerTodo />, <TimerExam />][n];
  }
  function timerFooter(n: number) {
    return [<>순공</>, <>목표</>, <TimerExamFooter />][n];
  }
  const [choosedTab, setChoosedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setChoosedTab(newValue);
  };

  const [footerOpen, setFooterOpen] = useState(false);
  return (
    <>
      {timerOpen ? (
        <Draggable>
          <div className={widget.widget}>
            <div className={widget.widgetHeader}>
              <div className={widget.widgetTitle}>
                <img
                  src={`/stopwatch.png`}
                  style={{ width: '20px', height: '20px', marginRight: '5px' }}
                ></img>
                <b>TIMER</b>
              </div>
              <div className={widget.widgetCloseBtnContainer}>
                <button id={widget.widgetCloseBtn}>
                  <img
                    src="/minus.png"
                    width="18px"
                    onClick={() => {
                      setTimerOpen(false);
                    }}
                  ></img>
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
                centered
              >
                <Tab
                  label="순공"
                  {...a11yProps(0)}
                  onClick={() => setChoosedTab(0)}
                />
                <Tab
                  label="목표"
                  {...a11yProps(1)}
                  onClick={() => setChoosedTab(1)}
                />
                <Tab
                  label="수능"
                  {...a11yProps(2)}
                  onClick={() => setChoosedTab(2)}
                />
                <Button
                  variant="text"
                  onClick={(e) => {
                    console.log(choosedTab);
                    setFooterOpen(!footerOpen);
                  }}
                  sx={{ color: 'primary.dark' }}
                >
                  {footerOpen ? <span>▲</span> : <span>▼</span>}
                </Button>
              </Tabs>
            </div>
            <div className={widget.widgetFooter}>
              <TabPanel value={choosedTab} index={choosedTab}>
                {footerOpen ? timerFooter(choosedTab) : null}
              </TabPanel>
            </div>
          </div>
        </Draggable>
      ) : null}
    </>
  );
};

export default Timer;
