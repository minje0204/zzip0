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
  const barOptions = {
    width: '100%',
    series: [
      {
        name: 'Metric1',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric2',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric3',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric4',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric5',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric6',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric7',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric8',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      },
      {
        name: 'Metric9',
        data: generateData(18, {
          min: 0,
          max: 90
        })
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'heatmap'
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#008FFB'],
      title: {
        text: 'HeatMap Chart (Single color)'
      }
    }
  };
  return (
    <div>
      <ApexCharts options={barOptions.options} series={barOptions.series} />
    </div>
  );
};

export default ReportStrick;
