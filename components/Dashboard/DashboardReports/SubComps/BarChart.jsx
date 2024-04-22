"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const BarChart = ({ graphData }) => {
  const [currPageIndex, setCurrPageIndex] = useState(0);
  const chartRef = useRef(null);
  const chartName = graphData.ChartName;
  const chartColor = graphData.ChartColor;
  //const chartColor = "rgba(9, 151, 213, 0.5)";
  //const xAxisArray = graphData.XAxisData;
  const xAxisArray = graphData.XAxisPaginatedData[currPageIndex];
  //const yAxisArray = graphData.YAxisData;
  const yAxisArray = graphData.YAxisPaginatedData[currPageIndex];
  const keyMin = graphData.KeyMin;
  const keyMax = graphData.KeyMax;
  const dataMin = graphData.DataMin;
  const dataMax = graphData.DataMax;

  useEffect(() => {
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    const context = chartRef.current.getContext("2d");

    const newChart = new Chart(context, {
      type: "line",
      data: {
        //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        labels: xAxisArray,
        datasets: [
          {
            //barThickness: 50,
            //maxBarThickness: 100,
            fill: {
              target: "origin",
              //above: chartColor,
              //above: "rgba(90, 151, 213, 0.5)", // Area will be red above the origin
              //below: "rgb(0, 0, 255)", // And blue below the origin
              //below: chartColor,
            },
            label: chartName,
            //data: [12, 19, 3, 5, 2, 3],
            data: yAxisArray,
            borderWidth: 1,
            backgroundColor: chartColor,
          },
        ],
      },
      options: {
        indexAxis: "x",
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            type: "category",
            ticks: {
              //maxRotation: 50,
              //minRotation: 30,
              //padding: 40,
              autoSkip: false,
              fontSize: 8,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              //maxRotation: 50,
              //minRotation: 30,
              padding: 10,
              autoSkip: false,
              fontSize: 10,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                family: "Roboto",
                size: 14,
                weight: "bold",
              },
            },
          },
        },
      },
    });

    chartRef.current.chart = newChart;
  }, [xAxisArray]);

  function OnClick_PageLeft() {
    //console.log("Left Page Clicked");
    setCurrPageIndex((cp) => cp - 1);
  }

  function OnClick_PageRight() {
    //console.log("Right Page Clicked");
    setCurrPageIndex((cp) => cp + 1);
  }

  return (
    <section className="flex flex-col items-center justify-center p-0 md:p-2 w-full h-full border-2 bg-white border-tif-blue/20 rounded-lg shadow-md">
      <canvas ref={chartRef} className="" />

      {/* Pagination UI */}
      <section className="flex items-center justify-center w-full h-full">
        <div className="flex items-center justify-center p-1 gap-4 w-full">
          <h1 className="text-sm">
            Viewing {currPageIndex * 10 + 1} -{" "}
            {currPageIndex * 10 + xAxisArray.length} of{" "}
            {graphData.XAxisData.length}
          </h1>
          <div className="flex items-center justify-center gap-4">
            <button
              className="rounded-full disabled:text-gray-300 enabled:hover:bg-gray-300 transition-all"
              disabled={currPageIndex == 0}
              onClick={OnClick_PageLeft}
            >
              <ChevronLeftIcon className="w-9 h-9 p-2" />
            </button>
            <button
              className="rounded-full disabled:text-gray-300 enabled:hover:bg-gray-300 transition-all"
              disabled={
                currPageIndex + 1 == graphData.XAxisPaginatedData.length
              }
              onClick={OnClick_PageRight}
            >
              <ChevronRightIcon className="w-9 h-9 p-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Min Max Data UI */}
      {/*<div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center w-full">
          <h1>Min Data Set</h1>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <h1>Max Data Set</h1>
        </div>
      </div>*/}
    </section>
  );
};

export default BarChart;
