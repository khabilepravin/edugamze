import React, { useState } from "react";
import Chart from "react-google-charts";
import { Container, Row, Col, Table, Badge, Button, Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { useHistory } from "react-router";
import {
  faTimes,
  faCheck,
  faGamepad,
  //faListAlt,
} from "@fortawesome/free-solid-svg-icons";

import Map from "./map";

const ResultMap = React.memo((props) => {
  const [selectedResultCountry, setSelectedResultCountry] = useState("");
  //const history = useHistory();
  // const handleNewGameClick = () => {
  //   history.push("/");
  // };

  const handleResultCountrySelection = (countryClicked) => {
    setSelectedResultCountry(countryClicked);
  };

  if (props.results) {
    // let chartData = [["Country"]];

    // props.results.map((result) => {
    //   chartData.push([result.countryName, result.isCorrect ? 1 : 0]);
    // });

    return (
      <Container>
        <br />
        <Alert color="primary">
          Mouseover or tap on the map to see country names
        </Alert>
        {/* <Badge color="danger">
          <h6>
            <FontAwesomeIcon icon={faTimes} />
          </h6>
        </Badge>
        <Badge color="success">
          <h6>
            <FontAwesomeIcon icon={faCheck} />
          </h6>
        </Badge> */}
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
