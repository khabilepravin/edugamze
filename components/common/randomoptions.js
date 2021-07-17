import React, { useEffect, useState } from "react";
import { ButtonGroup, Button } from "reactstrap";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const RandomOptions = React.memo((props) => {
  //const [userSelectedOption, setUserSelectedOption] = useState('');
  const fullListOfOptions = props.completeOptions;
  const filteredList = [];
  const randomIndexesArr = [];

  useEffect(() => {
    
  }, [props.rightChoice]);

  for (let i = 0; i < props.maxRandomChoices; ) {
    let randomI = getRandomInt(fullListOfOptions.length);
    if (randomIndexesArr.includes(randomI) === false) {
      randomIndexesArr.push(randomI);
      i++;
    }
  }

  randomIndexesArr.map((i) => {
    filteredList.push(fullListOfOptions[i]);
  });

  if (props.rightChoice) {
    const randomIndexToPutTheRightAnswerAt = getRandomInt(filteredList.length);
    filteredList.splice(randomIndexToPutTheRightAnswerAt, 0, props.rightChoice);
  }

  if (filteredList) {
    return (
      <ButtonGroup vertical>
        {filteredList.map((opt) => {
          return (
            <Button key={opt.countryName} color="primary"
                type="button" 
                onClick={() => props.onUserSelection(opt)}>
              {" "}
              {opt.countryName}
            </Button>
          );
        })}
      </ButtonGroup>
    );
  } else {
    return <h2>nothing to render</h2>;
  }
});

export default RandomOptions;
