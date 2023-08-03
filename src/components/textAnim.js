import React, { useEffect, useRef, useState } from "react";

// could've used some simple css properties to make this, but i wanted the text animation to look more realistic and responsive.

const TextAnim = (props) => {
  const { res, fetched } = props;

  const textRef = useRef("");
  const resRef = useRef("");
  const fetchRef = useRef(0);
  const resIndexRef = useRef(0);
  const firstIntervalRef = useRef(null);
  const secIntervalRef = useRef(null);
  const [text, setText] = useState(textRef.current);
  const [resIndex, setResIndex] = useState(0);

  let firstIndex = 0;

  fetchRef.current = fetched;
  resRef.current = res;

  const cleanUp = () => {
    textRef.current = textRef.current.slice(0, -1);
    setText(textRef.current);
  };

  const animFn = (firstIndex, resIndex) => {
    clearInterval(firstIntervalRef.current);
    clearInterval(secIntervalRef.current)

    // eslint-disable-next-line
    firstIntervalRef.current = setInterval(() => {
      if (firstIndex >= resRef.current[resIndex].length) {
        if (resRef.current[resIndex + 1]) {
          setTimeout(() => {
            // eslint-disable-next-line
            secIntervalRef.current = setInterval(() => {
              cleanUp();
              if (textRef.current === "") {
                firstIndex = 0;
                resIndexRef.current++;
                clearInterval(secIntervalRef.current)
                animFn(firstIndex, resIndexRef.current);
              }
            }, 80);
          }, 2000);
          clearInterval(firstIntervalRef.current);
        } else {
          if (fetchRef.current) {
            clearInterval(firstIntervalRef.current)
          }
        }
      }
      textRef.current += resRef.current[resIndex].charAt(firstIndex);
      firstIndex++;
      setText(textRef.current);
    }, 80);
  };

  useEffect(() => {

    if (resIndex !== 0 && resIndex === res.length - 1) {
      clearInterval(firstIntervalRef.current);
      clearInterval(secIntervalRef.current)
      setTimeout(()=>{
        let cleanUpInterval = setInterval(() => {
          cleanUp();
          if (textRef.current === "") {
            clearInterval(cleanUpInterval);
            animFn(0, resIndex);
          }
        }, 80);
      }, 1000)
    }
    else{
      resRef.current = res;
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
      clearInterval(firstIntervalRef.current);
      clearInterval(secIntervalRef.current)
    };

    // eslint-disable-next-line
  }, []);

  return <>{text}</>;
};

export default TextAnim;
