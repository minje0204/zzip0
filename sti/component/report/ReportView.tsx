// @ts-nocheck
import React from 'react';
//mui, css
import home from '../../styles/Home.module.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//component
import ReportStrick from './ReportStrick';

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
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="개요" />
        <Tab label="History" />
        <Tab label="뭐할라그랫더라" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ReportStrick />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
};

export default ReportView;
