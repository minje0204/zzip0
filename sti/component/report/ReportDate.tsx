// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { getDateTimeView } from '../../lib/api/timeview';
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
      text: '일별 공부량'
    }
  }
};

interface Test {}

const ReportDate: Test = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const todayDateStr = year + month + day;
  const [todayTime, setTodayTime] = useState([]);
  const [todayTotal, setTodayTotal] = useState(0);

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
        label: 'TODAY',
        data: [5, 321, 413, 0],
        backgroundColor: 'rgba(174, 207, 255, 0.6)'
      }
    ]
  });

  useEffect(() => {
    if (params.proId) {
      getDateTimeView(todayDateStr, params.proId).then((res) => {
        if (res.data) {
          setTodayTime(res.data.times);
          const newDataSet = [
            {
              label: '오늘의 공부량',
              data: res.data.times,
              backgroundColor: 'rgba(174, 207, 255, 0.6)'
            }
          ];
          setData({ ...data, datasets: newDataSet });
        }
      });
    }
  }, [router.isReady]);

  useEffect(() => {
    const result = todayTime.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);
    setTodayTotal(result);
  }, [todayTime]);

  useEffect(() => {
    console.log('today', todayTotal);
  }, [todayTotal]);

  return (
    <DateChartContainer>
      <TodayTotalContainer>
        {todayTotal === 0 ? (
          <div>오늘 기록된 공부시간이 없어요</div>
        ) : (
          <div>오늘, 총 {todayTotal}분 공부했어요</div>
        )}
      </TodayTotalContainer>

      <Bar options={options} data={data} style={{ width: '1000px' }} />
    </DateChartContainer>
  );
};

const DateChartContainer = styled.div`
  margin-top: 30px;
`;
const TodayTotalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
`;

export default ReportDate;
