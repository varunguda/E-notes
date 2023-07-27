import { useState } from "react";
import NoteContext from "./NoteContext";

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
    <NoteContext.Provider value={{ state, updateState }}>
        {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
