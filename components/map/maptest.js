import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'

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
  const history = useHistory();
  const totalCountriesInATest = 10;
  const [countries, setCountries] = useCountryData(totalCountriesInATest);
  const [attempts, setAttempts] =  useState(1);
  const [buttonText, setButtonText] = useState("Next");
  const [buttonClass, setButtonClass] = useState("primary");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [results, setResults] = useState([]);
  
  const handleUserAnswer = (event) =>{
    setUserAnswer(event.target.value);
  };

  const moveToNextCountry = (event) => {
    event.preventDefault();
    setUserAnswer("");
    let isCorrect = verifyIfCorrect(
      countries[currentIndex].countryName,
      userAnswer
    );

    setResults((results) => [
      ...results,
      {
        countryName: countries[currentIndex].countryName,
        userEnteredAnswer: userAnswer,
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
      let isCorrect = verifyIfCorrect(
        countries[currentIndex].countryName
      );
      finalResult.push({
        countryName: countries[currentIndex].countryName,
        userEnteredAnswer: userAnswer,
        isCorrect: isCorrect,
      });
      setResults(finalResult);
    }
  };

  const resetForNewGame = () => {
    setCurrentIndex(0);
    setResults([]);
    setAttempts((attempts+1));
    setButtonClass("primary");
    setButtonText("Next");
  };

  const handleNewGameClick = () => {
    // setCurrentIndex(0);
    // setResults([]);
    // setAttempts((attempts+1));
    //resetForNewGame();
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
          <br/>
          <Row>
            <Col className="d-flex justify-content-center">
              <Input
                type="text"
                placeholder="Enter Highlighted Country Name"
                spellCheck="false"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                autoFocus={true}
                className="input-lg"
                list="countriesList"
                value={userAnswer}
                onChange={handleUserAnswer}
              />
              <datalist id="countriesList">
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Germany</option>
                <option>Russia</option>
                <option>Australia</option>
                <option>New Zealand</option>
                <option>Japan</option>
                <option>Canada</option>
                <option>Brazil</option>
                <option>Mexico</option>
                <option>Austria</option>
                <option>Afghanistan</option>
                <option>Albania</option>
                <option>Algeria</option>
                <option>American Samoa</option>
                <option>Andorra</option>
                <option>Angola</option>
                <option>Anguilla</option>
                <option>Bhutan</option>
                <option>Democratic Republic of the Congo</option>
                <option>Liechtenstein</option>
                <option>Sudan</option>
                <option>Zimbabwe</option>
                <option>Mauritania</option>
                <option>Mozambique</option>
                <option>Nigeria</option>
                <option>Iraq</option>
                <option>Guyana</option>
                <option>Namibia</option>
                <option>Senegal</option>
                <option>Turkmenistan</option>
                <option>Fiji</option>
                <option>Gabon</option>
                <option>Uzbekistan</option>
                <option>Cameroon</option>
                <option>Cuba</option>
                <option>Faroe Islands</option>
                <option>El Salvador</option>
                <option>Caribbean</option>
                <option>Ethiopia</option>
                <option>Mongolia</option>
                <option>Puerto Rico</option>
                <option>Samoa</option>
                <option>Myanmar</option>
                <option>Nicaragua</option>
                <option>Seychelles</option>
                <option>Tajikistan</option>
                <option>Dominican Republic</option>
                <option>Guinea</option>
                <option>Barbados</option>
                <option>CI</option>
                <option>Laos</option>
                <option>Libya</option>
                <option>Panama</option>
                <option>Bahrain</option>
                <option>Benin</option>
                <option>Ghana</option>
                <option>Haiti</option>
                <option>Montenegro</option>
                <option>Somalia</option>
                <option>Syria</option>
                <option>Ecuador</option>
                <option>Honduras</option>
                <option>Madagascar</option>
                <option>Papua New Guinea</option>
                <option>Tunisia</option>
                <option>Botswana</option>
                <option>Cyprus</option>
                <option>Bahamas</option>
                <option>New Caledonia</option>
                <option>Uganda</option>
                <option>Yemen</option>
                <option>Zambia</option>
                <option>Antarctica</option>
                <option>Paraguay</option>
                <option>Jamaica</option>
                <option>Palestine</option>
                <option>Bolivia</option>
                <option>Bosnia and Herzegovina</option>
                <option>Vietnam</option>
                <option>Kenya</option>
                <option>Luxembourg</option>
                <option>Niger</option>
                <option>Kuwait</option>
                <option>Hawaii</option>
                <option>Scotland</option>
                <option>Cambodia</option>
                <option>Uruguay</option>
                <option>Kyrgyzstan</option>
                <option>Saudi Arabia</option>
                <option>Indonesia</option>
                <option>Azerbaijan</option>
                <option>United Arab Emirates</option>
                <option>Mauritius</option>
                <option>Morocco</option>
                <option>South Korea</option>
                <option>Kazakhstan</option>
                <option>Macedonia</option>
                <option>Venezuela</option>
                <option>Taiwan</option>
                <option>Qatar</option>
                <option>Jordan</option>
                <option>Iceland</option>
                <option>Guatemala</option>
                <option>Costa Rica</option>
                <option>Hong Kong</option>
                <option>San Marino</option>
                <option>Colombia</option>
                <option>Moldova</option>
                <option>Armenia</option>
                <option>Malta</option>
                <option>Nepal</option>
                <option>Lebanon</option>
                <option>Malaysia</option>
                <option>Serbia</option>
                <option>Peru</option>
                <option>Trinidad and Tobago</option>
                <option>Lithuania</option>
                <option>Estonia</option>
                <option>Georgia</option>
                <option>Iran</option>
                <option>Chile</option>
                <option>Latvia</option>
                <option>Thailand</option>
                <option>Egypt</option>
                <option>Slovenia</option>
                <option>Mexico</option>
                <option>Belarus</option>
                <option>Slovakia</option>
                <option>Sri Lanka</option>
                <option>Croatia</option>
                <option>Philippines</option>
                <option>Bangladesh</option>
                <option>Turkey</option>
                <option>Romania</option>
                <option>Italy</option>
                <option>South Africa</option>
                <option>Hungary</option>
                <option>Pakistan</option>
                <option>Portugal</option>
                <option>Ukraine</option>
                <option>Greece</option>
                <option>Oman</option>
                <option>Argentina</option>
                <option>Singapore</option>
                <option>Bulgaria</option>
                <option>Japan</option>
                <option>Czech Republic</option>
                <option>Ireland</option>
                <option>China</option>
                <option>Finland</option>
                <option>Brazil</option>
                <option>Norway</option>
                <option>Denmark</option>
                <option>Belgium</option>
                <option>New Zealand</option>
                <option>Spain</option>
                <option>Switzerland</option>
                <option>Poland</option>
                <option>Israel</option>
                <option>Sweden</option>
                <option>Netherlands</option>
                <option>France</option>
                <option>Burundi</option>
                <option>Tanzania</option>
                <option>Burkina Faso</option>
              </datalist>
            </Col>
          </Row>
          <br/>
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
          <Row>
            <Col className="d-flex justify-content-center">
              <Button color={buttonClass} type="submit">
                <FontAwesomeIcon
                  icon={buttonText == "Done" ? faCheck : faForward}
                />{" "}
                {buttonText}
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    );
  } else if(results.length === totalCountriesInATest) {
    return <ResultMap results={results} handleNewGameClick={handleNewGameClick}/>
  }
  else{
    return <h2>Loading...</h2>;
  }
};

export default MapTest;
