import React, { useEffect, useState } from 'react';
import TextAnim from './textAnim';

const About = () => {
  const [ msg, setMsg ] = useState(["Hey there...","Welcome to another boring, lifeless💤 app"]);
  useEffect(()=>{
    setTimeout(()=>{
      setMsg([msg[0], "Welcome to fun and interactive app🥳 which can be used to store your personal notes📝. Your notes are completely private and can only be accessed by you🫣, I hope you'd enjoy being here❤️"])
    }, 5700)
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <TextAnim res={msg} fetched={true}/>
      <span className='cursor'></span>
    </div>
  )
}

export default About
