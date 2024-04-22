const GenerateReportsTableData = (analyticsAPIdata) => {
  const data = [
    {
      id: 1,
      name: "Projesh Mehta",
      email: "projeshmehta1@gmail.com",
      age: "31",
    },
    {
      id: 1,
      name: "Indrajit Adhikary",
      email: "iadhikary30@gmail.com",
      age: "33",
    },
  ];
  //console.log("Recieved API data - " + JSON.stringify(analyticsAPIdata));

  let generatedTableData = [];

  for (let i = 0; i < analyticsAPIdata.length; i++) {
    generatedTableData.push(analyticsAPIdata[i]);
  }

  //console.log("generated table data" + generatedTableData);

  return generatedTableData;
};

export default GenerateReportsTableData;
