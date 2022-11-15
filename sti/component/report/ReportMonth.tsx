// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { getMonthTimeView } from '../../lib/api/timeview';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: '월별 공부량'
    }
  }
};

interface Test {}

const ReportMonth: Test = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const [monthData, setMonthData] = useState([]);
  const [requestDate, setRequestDate] = useState(`${year}${month}`);
  const monthKo = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const monthNum = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
  ];

  const router = useRouter();
  const params = router.query;
  const [data, setData] = useState({
    labels: [
      '국어',
      '수학',
      '영어',
      '한국사',
      '탐구1',
      '탐구2',
      '외국어',
      '기타'
    ],
    datasets: [
      {
        label: '월별 공부량',
        data: [5, 321, 413, 0],
        backgroundColor: 'rgba(174, 207, 255, 0.6)'
      }
    ]
  });

  const handleClick = (num) => {
    const dateStr = `2022${num}`;
    getMonthTimeView(202211, params.proId).then((res) => {
      setMonthData(res.data);
      const newDataSet = [
        {
          label: '월별 공부량',
          data: res.data.times,
          backgroundColor: 'rgba(174, 207, 255, 0.6)'
        }
      ];
      setData({ ...data, datasets: newDataSet });
    });
  };

  useEffect(() => {
    console.log(params.proId);
    getMonthTimeView(202211, params.proId).then((res) => {
      setMonthData(res.data);
    });
  }, [router.isReady]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <MonthBtnContainer>
        {monthKo.map((value, index) => (
          <Button
            onClick={() => handleClick(monthNum[index])}
            sx={{
              border: 1,
              borderColor: '#e9e9e9',
              backgroundColor: 'white',
              borderRadius: 4,
              margin: 0.5
            }}
            color="inherit"
          >
            {value}
          </Button>
        ))}
      </MonthBtnContainer>
      <Bar options={options} data={data} style={{ width: '1000px' }} />
    </>
  );
};

const MonthBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export default ReportMonth;