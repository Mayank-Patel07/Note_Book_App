import React, { useContext, useState } from "react";
import Createcontext from "../Context/Createcontext";

export default function Addnote() {
  // using context Api
  const Context_notes = useContext(Createcontext);
  const { addNote } = Context_notes;

  // setting notes
  const [notes, setnotes] = useState({ title: "", description: "" });

  const HandleOnClick = (event) => {
    event.preventDefault();

    // Calling addNote function and set the title and description
    addNote(notes.title, notes.description);

    // Reset the title and description
    setnotes({ title: " ", description: " " });
  };

  const onchange = (e) => {
    // Used to type on a text field
    setnotes({ ...notes, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-2">
      <h1>Add Your Notes </h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            value={notes.title} // It shows on the input field
            name="title" // use for verifying the values
            id="title"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={notes.description}
            className="form-control"
            id="description"
            onChange={onchange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary button-62"
          onClick={HandleOnClick}
          disabled={
            notes.title.length < 5 || notes.description.length < 5
              ? true
              : false
          }
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
