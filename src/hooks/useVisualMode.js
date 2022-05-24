import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  function transition(newMode, replace = false) {
    if (replace === true) {
      setMode(newMode);

    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  }


  function back() {
    let newHistory = [...history];
    newHistory.pop(mode);
    setHistory((prev) => newHistory);
    if (history.length > 1) {
    setMode((prev) => newHistory[(newHistory.length - 1)]);
    }



    // setMode(history[history.length - 1]);
  }

  return { mode, transition, back };
}
