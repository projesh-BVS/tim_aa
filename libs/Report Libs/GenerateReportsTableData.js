const GenerateReportsTableData = (analyticsAPIdata) => {
  let generatedTableData = [];

  for (let i = 0; i < analyticsAPIdata.length; i++) {
    generatedTableData.push(analyticsAPIdata[i]);
  }  

  return generatedTableData;
};

export default GenerateReportsTableData;
