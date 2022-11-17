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
      text: '연도별 공부량'
    }
  }
};

interface Test {}

const ReportYear: Test = () => {
  const today = new Date();
  const year = today.getFullYear();
  const [yearTime, setYearTime] = useState([]);
  const [yearTotal, setYearTotal] = useState(0);
  const [selectedyear, setSelectedYear] = useState(year);

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
        label: '2022 공부량',
        data: [5, 321, 413, 0],
        backgroundColor: 'rgba(174, 207, 255, 0.6)'
      }
    ]
  });

  const handleClick = (num) => {
    console.log('click', num);
    setSelectedYear(num);

    getYearReport(`${year}${num}`);
  };

  const getYearReport = (yearData) => {
    if (params.proId) {
      getYearTimeView(yearData, params.proId).then((res) => {
        if (res.data) {
          setYearTime(res.data.times);
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
    getYearReport(year);
  }, [router.isReady]);

  useEffect(() => {
    const result = yearTime.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);
    setYearTotal(result);
  }, [yearTime]);

  return (
    <>
      <YearTotalContainer>
        {yearTotal === 0 ? (
          <div>{year}년에 기록된 공부시간이 없어요 😥</div>
        ) : (
          <div>
            {year}년에, 총 {yearTotal}분 공부했어요 🙌
          </div>
        )}
      </YearTotalContainer>
      <Bar options={options} data={data} style={{ width: '1000px' }} />
    </>
  );
};

const YearTotalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
`;
export default ReportYear;
