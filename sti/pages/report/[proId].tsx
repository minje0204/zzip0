
// @ts-nocheck
import React from 'react';
import MyProfile from '../../component/report/MyProfile';
import ReportView from '../../component/report/ReportView'
import Navbar from '../../component/Navbar';
interface Test {}

const Report: Test = () => {
  return (
    <>
      <Navbar />
      <MyProfile />
      <ReportView />
    </>
    )
};

export default Report;
