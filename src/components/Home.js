import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';

const Home = () => {
    const set = useContext(NoteContext);
    useEffect(()=>{
        set.updateState();
        // eslint-disable-next-line
    },[])
  return (
    <div>
        This is {set.state.name} from {set.state.class}
    </div>
  )
}

export default Home;
