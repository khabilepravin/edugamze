import React, { useRef } from "react";
import { Badge } from "reactstrap";

const AudioPlayer = React.memo((props) => {
  const audioControlRef = useRef();

  if (audioControlRef.current) {
    audioControlRef.current.load();
  }

  if (props.audioUrl === null) {
    return (
      <Badge color="warning" pill>
        Not Available
      </Badge>
    );
  } else {
    return (
      <audio controls autoPlay={props.autoPlay} ref={audioControlRef}>
        <source src={props.audioUrl} type="audio/mp3" />
      </audio>
    );
  }
});

export default AudioPlayer;
