import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({
        title:"",
        description:"",
        tag:""
    });

    const addClickHandler = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description);

        const inputs = document.querySelectorAll('input[type="text"]');
        inputs.forEach(input => {
            input.value = "";
        });
    }

    const changeHandler = (e) =>{
        // {...note} is a destructuring property which initially has { "title":"", description:"", tag:""}
        // when added '[e.target.name]:e.target.value' to the '...note', since the e.target.name is "title"/"description" and value is whats written inside the input area, the "title"/"description" is assigned the corresponding value which is inside their input area upon each change.
        setNote({...note, [e.target.name] : e.target.value});
    }

  return (
    <div className="container my-5">
      <h2 className="my-3">ADD A NOTE</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            id="description"
            onChange={changeHandler}
          />
        </div>
        <button type="submit" className="btn btn-primary my-3" onClick={addClickHandler}>
          Add Note
        </button>
      </form>
    </div>
  )
}

export default AddNote
