import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const [ state, setState ] = useState({
        name:"raghav",
        class:6
    });
    const updateState = () =>{
        setTimeout(()=>{
            setState({
                name: "santosh",
                class: 8
            })
        },2000)
    }
  return (
    <noteContext.Provider value={{ state, updateState }}>
        {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
