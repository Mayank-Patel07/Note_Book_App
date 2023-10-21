import { useState } from "react";
import Createcontext from "../Context/Createcontext";

const ContextState = (props) => {
  // For Practices context api
  // const newstate = {
  //   name: "Mayank Patel",
  //   class: "12th",
  // };
  // const [state, setstate] = useState(newstate);
  // const update = () => {
  //   setTimeout(() => {
  //     setstate({
  //       name: "Mahind Patel",
  //       class: "B-Tech",
  //     });
  //   }, 1000);
  // };

  // Initialnotes of the fetch notes
  const Initialnotes = [];

  const [notes, setnotes] = useState(Initialnotes);

  // Get the notes from the DB
  const getNote = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_Host}/api/notes/fetchnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("TOKEN"),
        },
      }
    );
    const Json = await response.json();
    // console.log(Json);

    // Set the update notes of the logged in user
    setnotes(Json);
  };

  // Add the notes to the DB
  const addNote = async (title, description) => {
    const response = await fetch(
      `${import.meta.env.VITE_Host}/api/notes/addnotes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          // getting the token from the the local storage and set into the headers
          "auth-token": localStorage.getItem("TOKEN"),
        },

        // Giving title and description on a body
        body: JSON.stringify({ title, description }),
      }
    );
    const AddNote = await response.json();
    // console.log(AddNote);

    // Add a new note to the existing note list
    setnotes(notes.concat(AddNote));
  };

  // Delete the notes from the DB

  const deleteNote = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_Host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("TOKEN"),
        },
      }
    );
    const jsomss = await response.json();
    // console.log(jsomss);

    // console.log("Delete", id);
    const finddeleteone = notes.filter((Element) => {
      return Element._id !== id;
    });
    setnotes(finddeleteone);
  };

  // Edit the notes

  const editNote = async (id, title, description) => {
    const response = await fetch(
      `${import.meta.env.VITE_Host}/api/notes/updatenotes/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("TOKEN"),
        },
        body: JSON.stringify({ title, description }),
      }
    );
    const resposnse = await response.json();

    //  Making the another copy of notes
    let new_note = JSON.parse(JSON.stringify(notes));

    for (let i = 0; i < new_note.length; i++) {
      const element = new_note[i];
      // console.log(element);

      // If Logger in user ID is matched with parameter id then update the new note title and description and the break
      if (element._id === id) {
        new_note[i].title = title;
        new_note[i].description = description;
        break;
      }
    }

    //  update the new note title and description on Frontend site
    setnotes(new_note);
  };

  return (
    <Createcontext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </Createcontext.Provider>
  );
};

export default ContextState;
