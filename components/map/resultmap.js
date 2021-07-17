import React, { useState } from "react";
import { Container, Row, Col, Table, Badge, Button, Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCheck,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";

import Map from "./map";

const ResultMap = React.memo((props) => {
  const [selectedResultCountry, setSelectedResultCountry] = useState("");
  
  const handleResultCountrySelection = (countryClicked) => {
    setSelectedResultCountry(countryClicked);
  };

  if (props.results) {
    return (
      <Container>
        <br />
        <Alert color="primary">
          Click to locate it on the map
        </Alert>

        <br />

        <Button color="primary" onClick={props.handleNewGameClick}>
          <FontAwesomeIcon icon={faGamepad} /> New Game
        </Button>
        <br />
        <br />
        <Row>
          <Col className="d-flex justify-content-center">
            <Map currentCountry={selectedResultCountry}/>
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
              <th>Actual Country</th>
              <th>Your Guess</th>
            </tr>
          </thead>
          <tbody>
            {props.results.map((result) => {
              return (
                <tr key={result.countryName}>
                  <th>
                    <Button color="success" onClick={() => handleResultCountrySelection(result.countryName)}>
                      {result.countryName}
                    </Button>
                  </th>
                  <th>
                    <Badge color={result.isCorrect ? "primary" : "danger"}>
                      <h6>{result.userEnteredAnswer}</h6>
                    </Badge>{" "}
                    {}
                    <FontAwesomeIcon
                      icon={result.isCorrect ? faCheck : faTimes}
                      color="primary"
                    />
                  </th>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  } else {
    return <h2>No results</h2>;
  }
});

export default ResultMap;
