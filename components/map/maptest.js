import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
import Map from "./map";
import ResultMap from "./resultmap";

const filterMapVisibleCountriesOnly = (countriesArray) => {
  return countriesArray.filter((country) => country.isVisibleOnMap === true);
};

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

const MapTest = () => {
  const totalCountriesInATest = 10;
  const [countries] = useCountryData(totalCountriesInATest);
  const [allCountries] = useCountryData(0);
  const [attempts, setAttempts] = useState(1);
  const [buttonText, setButtonText] = useState("Next");
  const [buttonClass, setButtonClass] = useState("primary");
  const [currentIndex, setCurrentIndex] = useState(0);
  //const [userAnswer, setUserAnswer] = useState("");
  const [results, setResults] = useState([]);

  // const handleUserAnswer = (event) => {
  //   setUserAnswer(event.target.value);
  // };

  const moveToNextCountry = (data) => {
    //event.preventDefault();
    //setUserAnswer("");
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

  // const resetForNewGame = () => {
  //   setCurrentIndex(0);
  //   setResults([]);
  //   setAttempts(attempts + 1);
  //   setButtonClass("primary");
  //   setButtonText("Next");
  // };

  const handleUserSelection = (data) => {
    //setUserAnswer(data.countryName);
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
              <Map currentCountry={countries[currentIndex].countryName} />
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
          {/* <Row>
            <Col className="d-flex justify-content-center">
              <Button color={buttonClass} type="submit">
                <FontAwesomeIcon
                  icon={buttonText == "Done" ? faCheck : faForward}
                />{" "}
                {buttonText}
              </Button>
            </Col>
          </Row> */}
        </Container>
      </Form>
    );
  } else if (results.length === totalCountriesInATest) {
    return (
      <ResultMap results={results} handleNewGameClick={handleNewGameClick} />
    );
  } else {
    return <h2>Loading...</h2>;
  }
};

export default MapTest;
