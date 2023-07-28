import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]);

  const fetchNotes = async() =>{
    const  headers= {
        'Content-Type' : 'application/json',
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMmM4NmM5MzVjYjdhMzg3ZjQ4NDAwIn0sImlhdCI6MTY5MDQ4Njg5Mn0.bZWffx_vQRyinfcr4Z_XNiOyG6o0m5OfNfhA2woW5ao'
    }
    const response = await fetch(`${host}/notes/fetchnotes`, {headers});
    const data = await response.json();
    setNotes(data);
  }

  // useEffect(()=>{
  //   fetchNotes();
  // },[notes]);
  
  //Add a Note
  const addNote = async(title, description, tag) =>{

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMmM4NmM5MzVjYjdhMzg3ZjQ4NDAwIn0sImlhdCI6MTY5MDQ4Njg5Mn0.bZWffx_vQRyinfcr4Z_XNiOyG6o0m5OfNfhA2woW5ao'
      },
      body: JSON.stringify({ title, description, tag})
    }

    await fetch(`${host}/notes/addnote`, requestOptions);
    
    const note = {
      "_id": "64c2c89935cb7a387f4840ca",
    "userId": "64c2c86c935cb7a387f4840s0",
    "title": title,
    "description": description,
    "tag": tag?tag:"General",
    "date": "2023-07-27T19:42:22.344Z",
    "__v": 0,
    }
    setNotes(notes.concat(note));
  }

  //Delete a Note
  const deleteNote = async(id) =>{

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json',
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMmM4NmM5MzVjYjdhMzg3ZjQ4NDAwIn0sImlhdCI6MTY5MDQ4Njg5Mn0.bZWffx_vQRyinfcr4Z_XNiOyG6o0m5OfNfhA2woW5ao'
      }
    }

    await fetch(`${host}/notes/deletenote/${id}`, requestOptions);

    const filteredNotes = notes.filter((note)=>{return note._id!==id});
    setNotes(filteredNotes);
  }

  //Update a Note
  const editNote = async(title, description, tag, id) =>{

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMmM4NmM5MzVjYjdhMzg3ZjQ4NDAwIn0sImlhdCI6MTY5MDQ4Njg5Mn0.bZWffx_vQRyinfcr4Z_XNiOyG6o0m5OfNfhA2woW5ao'
      },
      body: JSON.stringify({title, description, tag})
    }

    const response = await fetch(`${host}/notes/updatenote/${id}`, requestOptions);

    const newNotes = notes.map((note)=>{
      if(note._id === id){
        return {...note, title: title, description: description, tag: tag}
      }else{
        return note
      }
    })

    setNotes(newNotes);
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
