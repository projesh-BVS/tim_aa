const GenerateReportsGraphData = (
  chartName,
  analyticsAPIdata,
  keyXAxis,
  keyYAxis,
  chartColor,
  maxElementsInPage = 10,
  doLog = false
) => {
  let generatedGraphData;
  let xAxisData = [];
  let xAxisPaginatedData = [];
  let yAxisData = [];
  let yAxisPaginatedData = [];
  let Key_Min = -1;
  let Key_Max = -1;
  let Data_Min = Number.MAX_SAFE_INTEGER;
  let Data_Max = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < analyticsAPIdata.length; i++) {
    for (let j = 0; j < Object.keys(analyticsAPIdata[i]).length; j++) {
      var currKey = Object.keys(analyticsAPIdata[i])[j];
      var currValue = Object.values(analyticsAPIdata[i])[j];
      if (chartName == "Category Views")
        console.log(
          chartName +
            " | Current Key: " +
            currKey +
            " | Current Val: " +
            currValue
        );

      if (currKey === keyXAxis) {
        xAxisData.push(currValue);
      }
      if (currKey === keyYAxis) {
        yAxisData.push(currValue);
        if (currValue < Data_Min) {
          Key_Min = currKey;
          Data_Min = currValue;
        }
        if (currValue > Data_Max) {
          Key_Max = currKey;
          Data_Max = currValue;
        }
      }
    }
  }

  let currPageXAxis = [];
  let currPageYAxis = [];

  for (let i = 1; i <= xAxisData.length; i++) {
    currPageXAxis.push(xAxisData[i - 1]);
    currPageYAxis.push(yAxisData[i - 1]);

    if (i % maxElementsInPage == 0) {
      xAxisPaginatedData.push(currPageXAxis);
      yAxisPaginatedData.push(currPageYAxis);
      currPageXAxis = [];
      currPageYAxis = [];
    } else {
      if (i == xAxisData.length) {
        xAxisPaginatedData.push(currPageXAxis);
        yAxisPaginatedData.push(currPageYAxis);
      }
    }
  }

  generatedGraphData = {
    ChartName: chartName,
    ChartColor: chartColor,
    XAxisData: xAxisData,
    XAxisPaginatedData: xAxisPaginatedData,
    YAxisData: yAxisData,
    YAxisPaginatedData: yAxisPaginatedData,
    KeyMin: Key_Min,
    KeyMax: Key_Max,
    DataMin: Data_Min,
    DataMax: Data_Max,
  };

  if (doLog) {
    console.log(
      "X Axis Data [" +
        xAxisData.length +
        " Items] => " +
        JSON.stringify(xAxisData)
    );

    console.log(
      "Y Axis Data [" +
        yAxisData.length +
        " Items] => " +
        JSON.stringify(yAxisData)
    );

    console.log("GenerateGraphData => " + JSON.stringify(generatedGraphData));
  }

  return generatedGraphData;
};

export default GenerateReportsGraphData;

/*
 data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
*/
