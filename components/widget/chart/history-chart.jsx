import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const HistoryChart = ({ height = 150, data }) => {
  let dates = [];
  let values = [];


  const series = [
    {
      name: "Rate",
      data: Object.values(data),
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    colors: ["#1BB400"],
    tooltip: {
      theme: "light",
    },
    legend: {
      offsetY: 4,
      show: true,
      fontSize: "12px",
      fontFamily: "Inter",
      labels: {
        colors: "#000",
      },
      markers: {
        width: 6,
        height: 6,
        offsetY: 0,
        offsetX: -5,
        radius: 12,
      },
      itemMargin: {
        horizontal: 18,
        vertical: 0,
      },
    },
    grid: {
      show: false,
      borderColor: "#334155",
      strokeDashArray: 10,
      position: "back",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.3,
        opacityFrom: 0.4,
        opacityTo: 0.5,
        stops: [0, 30, 0],
      },
    },
    yaxis: {
      labels: {
        show: false,
        style: {
          colors: "#000",
          fontFamily: "Inter",
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: Object.keys(data),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#000",
          fontFamily: "Inter",
        },
      },
    },
  };
  return (
    <>
      <Chart
        options={options}
        series={series}
        type="area"
        height={height}
        width="75%"
      />
    </>
  );
};

export default HistoryChart;
