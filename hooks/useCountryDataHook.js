import React from "react";
import CountriesData from "../data/data";

export const useCountryData = (numberRandomRecords) => {
  const [countries, setCountries] = React.useState([]);
  const countriesArray = JSON.parse(CountriesData);
  const countriesFiltered = countriesArray.filter(
    (country) => country.isVisibleOnMap === true
  );

  let recordIndexes = [];
  if (numberRandomRecords > 0) {
    for (let i = 0; i < numberRandomRecords; ) {
      let newRandomIndex = getRandomInt(countriesFiltered.length);
      if (recordIndexes.includes(newRandomIndex) === false) {
        recordIndexes.push(newRandomIndex);
        i++;
      }
    }
  }

  React.useEffect(() => {
    const resultArr = [];

    if (recordIndexes.length > 0) {
      recordIndexes.map((i) => {
        resultArr.push(countriesFiltered[i]);
      });
    } else {
      countriesFiltered.map((country) => {
        resultArr.push(country);
      });
    }

    setCountries(resultArr);
  }, []);

  return [countries];
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
