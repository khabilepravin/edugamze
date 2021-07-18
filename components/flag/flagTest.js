import React, { useState, useRef, useEffect } from "react";

import RandomOptions from "../common/randomoptions";

import {
  Button,
  Container,
  Col,
  Row,
  Progress,
  Input,
  Form,
  Badge,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faCheck } from "@fortawesome/free-solid-svg-icons";

import { useCountryData } from "../../hooks/useCountryDataHook";
//import ResultMap from "./resultmap";
import FlagResults from "./flagResults";

// const filterMapVisibleCountriesOnly = (countriesArray) => {
//   return countriesArray.filter((country) => country.isVisibleOnMap === true);
// };

export const verifyIfCorrect = (country, userAnswer) => {
  if (country && userAnswer) {
    if (country.trim().toUpperCase() == userAnswer.trim().toUpperCase()) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const FlagTest = () => {
  const totalCountriesInATest = 10;
  const [countries] = useCountryData(totalCountriesInATest);
  const [allCountries] = useCountryData(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);

  const moveToNextCountry = (data) => {
    let isCorrect = verifyIfCorrect(
      countries[currentIndex].countryName,
      data.countryName
    );

    setResults((results) => [
      ...results,
      {
        countryName: countries[currentIndex].countryName,
        userEnteredAnswer: data.countryName,
        isCorrect: isCorrect,
      },
    ]);

    setCurrentIndex(currentIndex + 1);

    if (currentIndex === totalCountriesInATest - 2) {
      setButtonText("Done");
      setButtonClass("success");
    }

    if (currentIndex === totalCountriesInATest - 1) {
      let finalResult = results.slice();
      let isCorrect = verifyIfCorrect(countries[currentIndex].countryName, data.countryName);
      finalResult.push({
        countryName: countries[currentIndex].countryName,
        userEnteredAnswer: data.countryName,
        isCorrect: isCorrect,
      });
      setResults(finalResult);
    }
  };

  const handleUserSelection = (data) => {
    moveToNextCountry(data);
  };

  const handleNewGameClick = () => {
    window.location.reload();
  };

  if (countries.length > 0 && results.length < totalCountriesInATest) {
    return (
      <Form onSubmit={moveToNextCountry}>
        <Container>
          {" "}
          <Row>
            <Col className="d-flex justify-content-center">
              {/* <Map currentCountry={countries[currentIndex].countryName} /> */}
              <img src={countries[currentIndex].flagUrl}/>
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="d-flex justify-content-center">
              <RandomOptions
                completeOptions={allCountries}
                maxRandomChoices="4"
                rightChoice={countries[currentIndex]}
                onUserSelection={handleUserSelection}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Progress value={currentIndex + 1} max={totalCountriesInATest}>
                <span color="danger">
                  {currentIndex + 1} of {totalCountriesInATest}
                </span>
              </Progress>
              <br />
            </Col>
          </Row>
        </Container>
      </Form>
    );
  } else if (results.length === totalCountriesInATest) {
    return (
      <FlagResults />
    );
  } else {
    return <h2>Loading...</h2>;
  }
};

export default FlagTest;
