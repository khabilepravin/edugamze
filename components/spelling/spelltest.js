import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";


import { Button, Container, Col, Row, Progress, Input, Form, Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faCheck } from "@fortawesome/free-solid-svg-icons";
import Word from "./word";
import Result from "./result";

import { useGetData } from "../../hooks/useGetDataHook";

export const verifyIfCorrect = (word, userAnswer) => {
  if (word && userAnswer) {
    if (word.trim().toUpperCase() == userAnswer.trim().toUpperCase()) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const SpellTest = () => {
  const history = useHistory();
  const userAnswerRef = useRef(null);
  const totalWordsInATest = 10;
  const [data] = useGetData(totalWordsInATest);
  const [buttonText, setButtonText] = useState("Next");
  const [buttonClass, setButtonClass] = useState("primary");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");

  const moveToNextWord = (event) => {
    event.preventDefault();
    setUserAnswer("");
    let isCorrect = verifyIfCorrect(
      data[currentIndex].wordData.word,
      userAnswer
    );
    setResults((results) => [
      ...results,
      {
        word: data[currentIndex].wordData.word,
        userEnteredAnswer: userAnswer,
        isCorrect: isCorrect,
      },
    ]);

    setCurrentIndex(currentIndex + 1);

    if (currentIndex === totalWordsInATest - 2) {
      setButtonText("Done");
      setButtonClass("success");
    }

    if (currentIndex === totalWordsInATest - 1) {
      let finalResult = results.slice();
      // Push the last item before redirecting
      let isCorrect = verifyIfCorrect(
        data[currentIndex].wordData.word,
        userAnswer
      );
      finalResult.push({
        word: data[currentIndex].wordData.word,
        userEnteredAnswer: userAnswer,
        isCorrect: isCorrect,
      });
      //history.push("/result", finalResult);
    }
  };

  const handleUserAnswer = (event) => {
    setUserAnswer(event.target.value);
  };

  const newGameClickHandler = () => {
    window.location.reload();
  };

  if (data.length > 0 && results.length < totalWordsInATest) {
    return (
      <Form onSubmit={moveToNextWord}>
        <Container>
          <Row>
            <Col className="d-flex justify-content-center">
              <Word currentWord={data[currentIndex].wordData} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                type="text"
                placeholder="Enter Spelling"
                spellCheck="false"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                autoFocus={true}
                className="input-lg"
                ref={userAnswerRef}
                value={userAnswer}
                onChange={handleUserAnswer}
              />
              <br />
            </Col>
          </Row>
          <Row>
            <Col>
              <Progress value={currentIndex + 1} max={totalWordsInATest}>
                <span color="danger">{currentIndex + 1} of {totalWordsInATest}</span>
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
  }
  else if(results.length === totalWordsInATest){
    return <Result results={results} handleNewGameClick={newGameClickHandler}/>;
  }
   else {
    return <h3>Loading...</h3>;
  }
};

export default SpellTest;

