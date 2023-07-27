import React, { useContext } from "react";
import NoteItem from "./noteItem";
import noteContext from "../context/notes/noteContext";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes } = context;
  return (
    <div>
      <h2>YOUR NOTES</h2>
      <div className="row my-4">
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
