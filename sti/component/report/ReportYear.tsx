// @ts-nocheck
import React from 'react';
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

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

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [5, 321, 413, 0],
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
    {
      label: 'Dataset 2',
      data: [1, 2, 3, 400],
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    }
  ]
};
interface Test {}

const ReportYear: Test = () => {
  return <Bar options={options} data={data} />;
};

export default ReportYear;
