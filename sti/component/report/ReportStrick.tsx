// @ts-nocheck
import React from 'react';
import dynamic from 'next/dynamic';

interface Test {}

function generateData(count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = 'w' + (i + 1).toString();
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y
    });
    i++;
  }
  return series;
}

const ReportStrick: Test = () => {
  const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
  const heatmapOptions = {
    width: '1000px',
    series: [
      {
        name: 'Series 1',
        data: [
          {
            x: 'W1',
            y: 22
          },
          {
            x: 'W2',
            y: 29
          },
          {
            x: 'W3',
            y: 13
          },
          {
            x: 'W4',
            y: 32
          }
        ]
      },
      {
        name: 'Series 2',
        data: [
          {
            x: 'W1',
            y: 43
          },
          {
            x: 'W2',
            y: 43
          },
          {
            x: 'W3',
            y: 43
          },
          {
            x: 'W4',
            y: 43
          }
        ]
      }
    ],

    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            {
              from: -30,
              to: 5,
              color: '#00A100',
              name: 'low'
            },
            {
              from: 6,
              to: 20,
              color: '#128FD9',
              name: 'medium'
            },
            {
              from: 21,
              to: 45,
              color: '#FFB200',
              name: 'high'
            }
          ]
        }
      }
    }
  };
  return (
    <div>
      <ApexCharts
        options={heatmapOptions.plotOptions}
        series={heatmapOptions.series}
      />
    </div>
  );
};

export default ReportStrick;
