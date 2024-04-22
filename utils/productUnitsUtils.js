const dimensionUnits = [
  { id: 1, display: "Millimeters", apiVal: "mm" },
  { id: 2, display: "Centimeters", apiVal: "cm" },
  { id: 3, display: "Meters", apiVal: "m" },
  { id: 4, display: "Inches", apiVal: "in" },
  { id: 5, display: "Feet", apiVal: "ft" },
];

const weightUnits = [
  { id: 1, display: "Milligrams", apiVal: "mg" },
  { id: 2, display: "Grams", apiVal: "g" },
  { id: 3, display: "Kilograms", apiVal: "kg" },
  { id: 4, display: "Metric Tons", apiVal: "mt" },
];

const sizeUnits = [
  { id: 1, display: "XS", apiVal: "XS" },
  { id: 2, display: "S", apiVal: "S" },
  { id: 3, display: "M", apiVal: "M" },
  { id: 4, display: "L", apiVal: "L" },
  { id: 5, display: "XL", apiVal: "XL" },
  { id: 6, display: "XXL", apiVal: "XXL" },
  { id: 7, display: "XXXL", apiVal: "XXXL" },
];

const bodyPositions = [
  { id: 1, display: "Ears", apiVal: "ear" },
  { id: 2, display: "Neck", apiVal: "neck" },
  { id: 3, display: "Torso", apiVal: "torso" },
  { id: 4, display: "Legs", apiVal: "legs" },
];

const currCodes = [
  { id: 1, display: "United States Dollar (USD)", apiVal: "usd" },
  { id: 2, display: "Euro (EUR)", apiVal: "eur" },
  { id: 3, display: "Japanese Yen (JPY)", apiVal: "jpy" },
  { id: 4, display: "British Pound Sterling (GBP)", apiVal: "gbp" },
  { id: 5, display: "Australian Dollar (AUD)", apiVal: "aud" },
  { id: 6, display: "Canadian Dollar (CAD)", apiVal: "cad" },
  { id: 7, display: "Swiss Franc (CHF)", apiVal: "chf" },
  { id: 8, display: "Chinese Yuan (CNY)", apiVal: "cny" },
  { id: 9, display: "Indian Rupee (INR)", apiVal: "inr" },
  { id: 10, display: "Brazilian Real (BRL)", apiVal: "brl" },
  { id: 11, display: "South Korean Won (KRW)", apiVal: "krw" },
  { id: 12, display: "Russian Ruble (RUB)", apiVal: "rub" },
  { id: 13, display: "Mexican Peso (MXN)", apiVal: "mxn" },
  { id: 14, display: "Singapore Dollar (SGD)", apiVal: "sgd" },
  { id: 15, display: "Hong Kong Dollar (HKD)", apiVal: "hkd" },
  { id: 16, display: "South African Rand (ZAR)", apiVal: "zar" },
  { id: 17, display: "New Zealand Dollar (NZD)", apiVal: "nzd" },
  { id: 18, display: "Swedish Krona (SEK)", apiVal: "sek" },
  { id: 19, display: "Norwegian Krone (NOK)", apiVal: "nok" },
  { id: 20, display: "Danish Krone (DKK)", apiVal: "dkk" },
];

export function getDimensionUnits() {
  return dimensionUnits;
}

export function getWeightUnits() {
  return weightUnits;
}

export function getSizeUnits() {
  return sizeUnits;
}

export function getSizeUnitsAPIVals() {
  let returnArr = [];

  for (let index = 0; index < sizeUnits.length; index++) {
    returnArr.push(sizeUnits[index].apiVal);
  }
  return returnArr;
}

export function getBodyPositions() {
  return bodyPositions;
}

export function getCurrencyUnits() {
  return currCodes;
}

export function GetDataCurrencyIndex(dataCurrencyApiVal) {
  for (let index = 0; index < currCodes.length; index++) {
    if (currCodes[index].apiVal === dataCurrencyApiVal) {
      return index;
    }
  }
  return null;
}

export function GetDataWeightIndex(dataWeightApiVal) {
  for (let index = 0; index < weightUnits.length; index++) {
    if (weightUnits[index].apiVal === dataWeightApiVal) {
      return index;
    }
  }
  return null;
}

export function GetDataDimensionIndex(dataDimensionApiVal) {
  for (let index = 0; index < dimensionUnits.length; index++) {
    console.log(
      "Checking Index Dimentions: " +
        index +
        " | formattedArray[index]: " +
        dimensionUnits[index].apiVal +
        " " +
        dataDimensionApiVal
    );
    if (dimensionUnits[index].apiVal === dataDimensionApiVal) {
      return index;
    }
  }
  return null;
}

export function GetDataBodyPos(dataBodyPosApiVal, showLogs) {
  for (let index = 0; index < bodyPositions.length; index++) {
    showLogs &&
      console.log(
        "Checking Index Body Positions: " +
          index +
          " | formattedArray[index]: " +
          bodyPositions[index].apiVal +
          " " +
          dataBodyPosApiVal
      );
    if (bodyPositions[index].apiVal === dataBodyPosApiVal) {
      return index;
    }
  }

  return null;
}

export function GetDataSizeIndex(dataSizeApiVal, showLogs = false) {
  let dataSelectedArray = [];
  dataSelectedArray.length = 0;

  for (let index = 0; index < sizeUnits.length; index++) {
    for (
      let productSizeIndex = 0;
      productSizeIndex < dataSizeApiVal.length;
      productSizeIndex++
    ) {
      showLogs &&
        console.log(
          "Checking Index Sizes: " +
            index +
            " | sizeUnits[" +
            index +
            "]: " +
            sizeUnits[index].apiVal +
            " look for " +
            dataSizeApiVal[productSizeIndex]
        );
      if (sizeUnits[index].apiVal === dataSizeApiVal[productSizeIndex]) {
        dataSelectedArray.push(sizeUnits[index]);
      }
    }
  }
  showLogs &&
    console.log("Current selected sizes length - " + dataSelectedArray.length);
  if (dataSelectedArray.length > 0) return dataSelectedArray;
  else return sizeUnits;
}
