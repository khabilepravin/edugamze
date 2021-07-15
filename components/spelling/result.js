import React from "react";
import { Table, Badge, Button, Row, Col, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck, faGamepad, faListAlt } from "@fortawesome/free-solid-svg-icons";

const Result = React.memo((props) => {
  if (props.results) {
    return (
      <Container>
        <br/>
        <Row>
          <Col>
            <h4><FontAwesomeIcon icon={faListAlt}/> Results</h4>
          </Col>
          <Col>
            <Button
              color="primary"
              className="float-right"
              onClick={props.handleNewGameClick}
            >
              <FontAwesomeIcon icon={faGamepad} /> New Game
            </Button>
          </Col>
        </Row>
        <br/>
        <Table>
          <thead>
            <tr>
              <th>Spelling</th>
              <th>Your Answer</th>
            </tr>
          </thead>
          <tbody>
            {props.results.map((result) => {
              return (
                <tr key={result.word}>
                  <th>
                    <Badge color="success">
                      <h6>{result.word}</h6>
                    </Badge>
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
    return (
      <Container>
        {" "}
        <Button color="primary" onClick={props.handleNewGameClick}>
          <FontAwesomeIcon icon={faGamepad} /> New Game
        </Button>{" "}
        <h2>No results </h2>
      </Container>
    );
  }
});

export default Result;
