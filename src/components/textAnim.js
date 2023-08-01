import React, { useEffect, useRef, useState } from "react";

const TextAnim = (props) => {
  const { res, fetched } = props;

  let intervalFirstText;
  let timeoutInterval;

  const textRef = useRef("");
  const resRef = useRef("");
  const fetchRef = useRef(0);
  const resIndexRef = useRef(0);
  const intervalRef = useRef([]);
  const [text, setText] = useState(textRef.current);
  const [resIndex, setResIndex] = useState(0);

  let firstIndex = 0;

  fetchRef.current = fetched;
  resRef.current = res;

  intervalRef.current.push(intervalFirstText);
  intervalRef.current.push(timeoutInterval);

  const cleanUp = () => {
    textRef.current = textRef.current.slice(0, -1);
    setText(textRef.current);
  };

  const animFn = (firstIndex, resIndex) => {
    intervalRef.current.forEach(clearInterval);
    intervalRef.current = [];

    // eslint-disable-next-line
    intervalFirstText = setInterval(() => {
      if (firstIndex >= resRef.current[resIndex].length) {
        if (resRef.current[resIndex + 1]) {
          setTimeout(() => {
            // eslint-disable-next-line
            timeoutInterval = setInterval(() => {
              cleanUp();
              if (textRef.current === "") {
                firstIndex = 0;
                resIndexRef.current++;
                clearInterval(timeoutInterval);
                animFn(firstIndex, resIndexRef.current);
              }
            }, 80);
          }, 2000);
          clearInterval(intervalFirstText);
        } else {
          if (fetchRef.current) {
            clearInterval(intervalFirstText);
          }
        }
      }
      textRef.current += resRef.current[resIndex].charAt(firstIndex);
      firstIndex++;
      setText(textRef.current);
    }, 80);
  };

  useEffect(() => {
    let cleanUpInterval;
    intervalRef.current.push(cleanUpInterval);

    const isIntervalRunning = intervalRef.current.some(
      (interval) => interval !== null
    );

    if (resIndex !== 0 && resIndex === res.length - 1 && isIntervalRunning) {
      clearInterval(intervalRef.current.forEach(clearInterval));

        cleanUpInterval = setInterval(() => {
          cleanUp();
          if (textRef.current === "") {
            clearInterval(cleanUpInterval);
            animFn(0, resIndex);
          }
        }, 80);
    } else {
      resRef.current = res;
    }

    return ()=>{
      intervalRef.current.forEach(clearInterval)
    }

    //eslint-disable-next-line
  }, [res]);

  useEffect(() => {
    fetchRef.current = fetched;
  }, [fetched]);

  useEffect(() => {
    setResIndex(resIndexRef.current);
    //eslint-disable-next-line
  }, [resIndexRef.current]);

  useEffect(() => {
    animFn(firstIndex, resIndex);

    return () => {
      // eslint-disable-next-line
      intervalRef.current.forEach(clearInterval);
    };

    // eslint-disable-next-line
  }, []);

  return <>{text}</>;
};

export default TextAnim;
