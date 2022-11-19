// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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
  const todayMonthStr = year + month;
  const [monthTime, setMonthTime] = useState([]);
  const [monthTotal, setMonthTotal] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(month);

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

  const handleClick = (e, num) => {
    console.log('click', num);
    setSelectedMonth(num);
    getMonthReport(`${year}${num}`);
  };

  const getMonthReport = (monthData) => {
    if (params.proId) {
      getMonthTimeView(monthData, params.proId).then((res) => {
        if (res.data) {
          setMonthTime(res.data.times);
          const newDataSet = [
            {
              label: '공부량',
              data: res.data.times,
              backgroundColor: 'rgba(174, 207, 255, 0.6)'
            }
          ];
          setData({ ...data, datasets: newDataSet });
        }
      });
    }
  };

  useEffect(() => {
    console.log(params.proId);
    getMonthReport(todayMonthStr);
  }, [router.isReady]);

  useEffect(() => {
    const result = monthTime.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);
    setMonthTotal(result);
  }, [monthTime]);

  return (
    <>
      <MonthTotalContainer>
        {monthTotal === 0 ? (
          <div>{selectedMonth}월에 기록된 공부시간이 없어요 😥</div>
        ) : (
          <div>
            {selectedMonth}월에, 총 {monthTotal}분 공부했어요 🙌
          </div>
        )}
      </MonthTotalContainer>
      <MonthBtnContainer>
        {monthKo.map((value, index) => (
          <IconButton
            color="inherit"
            variant="outlined"
            key={index}
            className="month-btn"
            sx={{
              backgroundColor: 'transparent',
              borderRadius: 4,
              margin: 1
            }}
            onClick={(e) => handleClick(e, monthNum[index])}
            size="medium"
          >
            <img src={`/month/${value}.png`} style={{ width: '30px' }} />
          </IconButton>
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
  margin: 30px 0px;
`;
const MonthTotalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
`;
export default ReportMonth;
