import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const noteArr = [
    {
      "_id": "64c2c89b935cb7a387f48403",
      "userId": "64c2c86c935cb7a387f48400",
      "title": "so good",
      "description": "not so good",
      "tag": "personal",
      "date": "2023-07-27T19:42:19.562Z",
      "__v": 0,
    },
    {
      "_id": "64c2c89c935cb7a387f48406",
      "userId": "64c2c86c935cb7a387f48400",
      "title": "so good",
      "description":
        "not so good",
      "date": "2023-07-27T19:42:20.873Z",
      "__v": 0,
    },
    {
      "_id": "64c2c89d935cb7a387f48409",
      "userId": "64c2c86c935cb7a387f48400",
      "title": "so good",
      "description": "not so good",
      "tag": "personal",
      "date": "2023-07-27T19:42:21.757Z",
      "__v": 0,
    },
    {
      "_id": "64c2c89e935cb7a387f4840c",
      "userId": "64c2c86c935cb7a387f48400",
      "title": "so good",
      "description": "not so good",
      "tag": "personal",
      "date": "2023-07-27T19:42:22.344Z",
      "__v": 0,
    },
    {
      "_id": "64c2c89e935cb7a38f4840c",
      "userId": "64c2c86c935cb7a387f48400",
      "title": "so good",
      "description": "not so good",
      "tag": "personal",
      "date": "2023-07-27T19:42:22.344Z",
      "__v": 0,
    },
    {
      "_id": "64c2c89935cb7a387f4840c",
      "userId": "64c2c86c935cb7a387f48400",
      "title": "so good",
      "description": "not so good",
      "tag": "personal",
      "date": "2023-07-27T19:42:22.344Z",
      "__v": 0,
    },
  ];
  const [notes, setNotes] = useState(noteArr);

  //Add a Note
  const addNote = (title, description, tag) =>{
    const note = {
        "_id": "64c2c89935cb7a387f4840ca",
      "userId": "64c2c86c935cb7a387f4840s0",
      "title": title,
      "description": description,
      "tag": tag?tag:"personal",
      "date": "2023-07-27T19:42:22.344Z",
      "__v": 0,
    }
    setNotes(notes.concat(note));
  }

  //Delete a Note
  const deleteNote = () =>{

  }

  //Update a Note
  const updateNote = () =>{

  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
