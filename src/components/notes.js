import React, { useContext, useEffect, useState } from "react";
import NoteItem from "./noteItem";
import noteContext from "../context/notes/noteContext";

const Notes = () => {

  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote } = context;

    const [note, setNote] = useState({
        "title":"",
        "description":"",
        "tag":""
    });

    useEffect(() => {
      fetchNotes();
      // eslint-disable-next-line
    }, []);

  const saveClickHandler = (e) => {
    e.preventDefault();

    editNote(note.title, note.description, note.tag, note._id);

    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  const changeHandler = (e) => {
    // {...note} is a destructuring property which initially has { "title":"", description:"", tag:""}
    // when added '[e.target.name]:e.target.value' to the '...note', since the e.target.name is "title"/"description" and value is whats written inside the input area, the "title"/"description" is assigned the corresponding value which is inside their input area upon each change.
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const updateNote = (note) => {
    setNote(note);
  };

  return (
    <div>
      <>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  EDIT NOTE
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={note.title}
                      onChange={changeHandler}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      id="description"
                      value={note.description}
                      onChange={changeHandler}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="tag"
                      id="tag"
                      value={note.tag}
                      onChange={changeHandler}
                    />
                  </div>
                </form>

              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={saveClickHandler} data-bs-dismiss="modal">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>

      <h2>YOUR NOTES</h2>
      <div className="row my-4 mx-1">
        {notes && notes.length > 0
          ? notes.map((note) => {
              return (
                <NoteItem key={note._id} note={note} updateNote={updateNote} />
              );
            })
          : "You dont have any notes, feel free to add one"}
      </div>
    </div>
  );
};

export default Notes;
