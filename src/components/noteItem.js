import React from "react";

const NoteItem = (props) => {
  const { note, updateNote, deleteNote } = props;

  const editClickHandler = () => {
    updateNote(note);
  };

  const noteDelete = () =>{
    deleteNote(note)
  }

  return (
    <>
    {console.log(note._id)}
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <i
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              className="fa-regular fa-pen-to-square"
              onClick={editClickHandler}
            />
            <i
              data-bs-toggle="modal"
              data-bs-target="#exampleModalDelete"
              onClick={noteDelete}
              className="fa-solid fa-trash mx-3"
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
