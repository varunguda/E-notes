import React, { useEffect, useRef, useState } from "react";

const TextAnim = (props) => {
  const { res, fetched } = props;
  const textRef = useRef("");
  const resRef = useRef("");
  const fetchRef = useRef("");
  const intervalRef = useRef([]);
  const [text, setText] = useState(textRef.current);

  fetchRef.current = fetched;
  resRef.current = res;
  useEffect(() => {
    resRef.current = res;
  }, [res]);
  useEffect(()=>{
    fetchRef.current = fetched;
  },[fetched])

  let firstIndex = 0;
  let resIndex = 0;
  let intervalFirstText;
  let timeoutInterval;
  
  intervalRef.current.push(intervalFirstText);
  intervalRef.current.push(timeoutInterval);

  useEffect(() => {
    const animFn = (firstIndex, resIndex) => {
    // eslint-disable-next-line
      intervalFirstText = setInterval(() => {
        console.log("int1");
        if (firstIndex >= resRef.current[resIndex].length) {
          if (resRef.current[resIndex + 1]) {
            setTimeout(() => {
            // eslint-disable-next-line
              timeoutInterval = setInterval(() => {
                textRef.current = textRef.current.slice(0, -1);
                setText(textRef.current);
                if (textRef.current === "") {
                  firstIndex = 0;
                  resIndex++;
                  clearInterval(timeoutInterval);
                  animFn(firstIndex, resIndex);
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
