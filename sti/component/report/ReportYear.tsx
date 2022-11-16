// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { getYearTimeView } from '../../lib/api/timeview';
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
      text: '2022 연도별 공부량'
    }
  }
};

interface Test {}

const ReportYear: Test = () => {
  const today = new Date();
  const year = today.getFullYear();
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
        label: '2022',
        data: [5, 321, 413, 0],
        backgroundColor: 'rgba(174, 207, 255, 0.6)'
      }
    ]
  });

  useEffect(() => {
    getYearTimeView(year, params.proId).then((res) => {
      console.log(res.data);
      const newDataSet = [
        {
          label: '연도별 공부량',
          data: res.data.times,
          backgroundColor: 'rgba(174, 207, 255, 0.6)'
        }
      ];
      setData({ ...data, datasets: newDataSet });
    });
  }, [router.isReady]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <DateChartContainer>
      <Bar options={options} data={data} style={{ width: '1000px' }} />
    </DateChartContainer>
  );
};

const DateChartContainer = styled.div`
  margin-top: 50px;
`;

export default ReportYear;
