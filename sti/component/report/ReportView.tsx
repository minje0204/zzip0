// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
//mui, css
import home from '../../styles/Home.module.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//component
import ReportStrick from './ReportStrick';
import ReportDate from './ReportDate';
import ReportMonth from './ReportMonth';
import ReportYear from './ReportYear';
import { Container } from '@mui/system';

interface Test {}

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
      {value === index && <div>{children}</div>}
    </div>
  );
}

const ReportView: Test = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className={home.homecontainer}>
      <ReprotViewContainer>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="TODAY" />
          <Tab label="History" />
          <Tab label="뭐할라그랫더라" />
        </Tabs>
        <TabPanel value={value} index={0}></TabPanel>
        <ReportDate />
        <TabPanel value={value} index={1} sx={{ width: '100%' }}></TabPanel>

        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </ReprotViewContainer>
    </div>
  );
};

const ReprotViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export default ReportView;
