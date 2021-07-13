import React, { useRef } from "react";

import {
  Container,
  Row,
  Col,
  Label,
} from "reactstrap";
import AudioPlayer from "./audioplayer";

const Word = React.memo((props) => {
  return (
    <Container>
      <Row>
        <Col>
          <Label>Word</Label>
        </Col>
      </Row>
      <Row>
        <Col>
          <AudioPlayer
            audioUrl={props.currentWord.wordAudioUrl}
            autoPlay={true}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Label>Definition</Label>
        </Col>
      </Row>
      <Row>
        <Col>
          <AudioPlayer
            audioUrl={props.currentWord.defintionAudioUrl}
            autoPlay={false}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>Example</Label>
        </Col>
      </Row>
      <Row>
        <Col>
          <AudioPlayer
            audioUrl={props.currentWord.exampleAudioUrl}
            autoPlay={false}
          />
        </Col>
      </Row>

    </Container>
  );
});

export default Word;
