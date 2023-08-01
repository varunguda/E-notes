import { useContext, useState, useEffect } from "react";
import noteContext from "./noteContext";
import AuthContext from "../auth/AuthContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const { authToken } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [res, setRes] = useState(["Please wait..."]);
  const [ fetched, setFetched ] = useState(false);

  const fetchNotes = async () => {

    if (authToken === null) {
      setFetched(prev=>!prev);
      setRes([res[0],"Login or Signup to add your personal notes!",]);
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      "auth-token": authToken,
    };

    try {
      const response = await fetch(`${host}/notes/fetchnotes`, { headers });
      const data = await response.json();
      if (data.length === 0) {
        setFetched(prev=>!prev);
        return setRes([
          res[0],
          "You don't have any notes, feel free to add one...",
        ]);
      }
      if (data.error) {
        return setRes([
          res[0],
          "Seems like something went wrong, try logging in again.",
        ]);
      }
      setFetched(prev=>!prev);
      setNotes(data);
    } catch (err) {
      console.error(err);
      return setRes([
        res[0],
        "Server connection failed, please try again later...",
      ]);
    }
  };

  useEffect(()=>{
    fetchNotes();
    // eslint-disable-next-line
  },[authToken])

  //Add a Note
  const addNote = async (title, description, tag) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({ title, description, tag }),
    };

    try {
      const response = await fetch(`${host}/notes/addnote`, requestOptions);
      const data = await response.json();

      const note = {
        _id: data._id,
        userId: "64c2c86c935cb7a387f4840s0",
        title: data.title,
        description: data.description,
        tag: data.tag ? data.tag : "General",
        date: "2023-07-27T19:42:22.344Z",
        __v: 0,
      };
      setNotes(notes.concat(note));
    } catch (err) {
      console.log(`Error adding note: ${err}`);
    }
  };

  //Delete a Note
  const deleteNote = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    };

    await fetch(`${host}/notes/deletenote/${id}`, requestOptions);

    const filteredNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(filteredNotes);
  };

  //Update a Note
  const editNote = async (title, description, tag, id) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({ title, description, tag }),
    };

    const response = await fetch(
      `${host}/notes/updatenote/${id}`,
      requestOptions
    );
    const data = await response.json();

    const newNotes = notes.map((note) => {
      if (note._id === id) {
        return {
          ...note,
          title: data.title,
          description: data.description,
          tag: data.tag,
        };
      } else {
        return note;
      }
    });
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, fetchNotes, res, fetched }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
