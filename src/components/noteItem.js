import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {

    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    
    const deleteClickHandler = () =>{
      deleteNote(note._id);
    }

    const editClickHandler = () =>{
      updateNote(note);
    }

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <i 
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="fa-regular fa-pen-to-square" 
          onClick={editClickHandler}
          />
          <i className="fa-solid fa-trash mx-3" onClick={deleteClickHandler}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
