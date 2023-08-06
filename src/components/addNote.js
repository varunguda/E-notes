import React, { useContext, useState, useId } from "react";
import noteContext from "../context/notes/noteContext";
import AuthContext from "../context/auth/AuthContext";

const AddNote = () => {
  const { addNote } = useContext(noteContext);
  const { loggedIn } = useContext(AuthContext);

  const titleDisId = useId();
  const descDisId = useId();

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const addClickHandler = (e) => {
    e.preventDefault();

    if (note.title.length === 0 || note.description.length < 3) {
      if (note.title.length === 0) {
        const titleDis = document.getElementById(`${titleDisId}`);
        titleDis.classList.remove("hide");
      }
      if (note.description.length < 3) {
        const descDis = document.getElementById(`${descDisId}`);
        descDis.classList.remove("hide");
      }
      return;
    }

    addNote(note.title, note.description, note.tag);
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach((input) => {
      input.value = "";
    });

    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  const changeHandler = (e) => {
    titleChangeHandler(e);
    descChangeHandler(e);
    // {...note} is a destructuring property which initially has { "title":"", description:"", tag:""}
    // when added '[e.target.name]:e.target.value' to the '...note', since the e.target.name is "title"/"description" and value is whats written inside the input area, the "title"/"description" is assigned the corresponding value which is inside their input area upon each change.
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const titleChangeHandler = (e) => {
    if (e.target.name === "title" && e.target.value !== null) {
      const titleDis = document.getElementById(`${titleDisId}`);
      titleDis.classList.add("hide");
    }
  };

  const descChangeHandler = (e) => {
    if (e.target.name === "description" && e.target.value.length >= 3) {
      const descDis = document.getElementById(`${descDisId}`);
      descDis.classList.add("hide");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="my-3">ADD A NOTE</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            Title *
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={changeHandler}
            disabled={loggedIn ? false : true}
          />
          <span id={titleDisId} className="title-disclaimer disclaimer hide">
            {loggedIn?"Title cannot be empty":""}
          </span>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="form-label">
            Description *
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            id="description"
            onChange={changeHandler}
            disabled={loggedIn ? false : true}
          />
          <span id={descDisId} className="desc-disclaimer disclaimer hide">
            {loggedIn?"Description must contain atleast 3 characters":""}
          </span>
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
            onChange={changeHandler}
            disabled={loggedIn ? false : true}
          />
        </div>

        <button
          type="submit"
          className="btn btn-warning my-3"
          onClick={addClickHandler}
          disabled={loggedIn ? false : true}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
