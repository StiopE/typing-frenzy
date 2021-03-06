import logo from "./logo.svg";
import { generate } from "./utils/words";
import "./App.css";
import useKeyPress from "./hooks/useKeyPress";
import React, { useState } from "react";
import { currentTime } from "./utils/time";

const initialWords = generate(20);

function App() {
  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(" ").join("")
  );

  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  

  const [outgoingChars, setOutgoingChars] = useState("");
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));
  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState("");

  useKeyPress((key) => {
    if (!startTime) {
      setStartTime(currentTime());
    }
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    const updatedTypedChars = typedChars + key;
    setTypedChars(updatedTypedChars);

    setAccuracy(
      ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(
        0
      )
    );

    if (key === currentChar) {
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }
      if (incomingChars.charAt(0) === " ") {
        setWordCount(wordCount + 1);

        const durationInMinutes = (currentTime() - startTime) / 60000.0;

        setWpm(((wordCount + 1) / durationInMinutes).toFixed(0));
      }
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      setCurrentChar(incomingChars.charAt(0));

      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(" ").length < 10) {
        updatedIncomingChars += " " + generate();
      }
      setIncomingChars(updatedIncomingChars);
    }
  });
  return (
    <div className="App">
      <header className="App-header">
        <p className="Character">
          <span className="Character-out">
            {(leftPadding + outgoingChars).slice(-20)}
          </span>
          <span className="Character-current">{currentChar}</span>
          <span>{incomingChars.substr(0, 20)}</span>
        </p>
        <h3>
          WPM: {wpm} | ACC: {accuracy}%
        </h3>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"

          
        ></a>
      </header>
    </div>
  );
}

export default App;
