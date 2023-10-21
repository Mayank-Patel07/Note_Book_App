import React, { useContext, useState, useEffect, useRef } from "react";
import Createcontext from "../Context/Createcontext";
import NotesItem from "./NotesItem";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  // For navigation or Redirecting to a different location
  let navigateTo = useNavigate();
  const { showalert } = props;

  // Using context api
  const Context_notes = useContext(Createcontext);

  //  destructuring the following from the context api
  const { notes, getNote, editNote } = Context_notes;

  //  Using useRef and set its initial value
  const first = useRef(null);
  const closebtn = useRef(null);

  const [note, setnote] = useState({
    id: "",
    ediTitle: "",
    editDescription: "",
  });
  useEffect(() => {
    // If JWt is available (token ) then show the notes of the logged in user
    if (localStorage.getItem("TOKEN")) {
      getNote();
    } else {
      // If not logged in then redirect to login page
      navigateTo("/login");
    }
    // eslint-disable-next-line
  }, []);

  const HandleOnClick = () => {
    editNote(note.id, note.ediTitle, note.editDescription);

    // .current is a part of the Ref Hook and .click is used to click like addeventlistener onclick event .
    closebtn.current.click();
    showalert("Note Edit Successfully", "success");
  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const editnote = (currentNote) => {
    first.current.click();
    setnote({
      id: currentNote._id,
      ediTitle: currentNote.title,
      editDescription: currentNote.description,
    });
  };
  return (
    <>
      <div className=" container row ">
        <h1> Your Notes </h1>
        <div className="container">
          {notes.length === 0 && "No Notes Available"}
        </div>
        {notes.map((element, index) => {
          // const { title, description, _id } = element;
          // console.log(element)
          return (
            <NotesItem
              key={index}
              // title={title}
              // description={description}
              // _id={_id}
              element={element}
              editnote={editnote}
              showalert={showalert}
            />
          );
        })}
      </div>

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={first}
        // Setting the use Ref hook with the name of ref is first .
      >
        Launch modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="editTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.ediTitle}
                    name="ediTitle"
                    id="ediTitle"
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editDescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    name="editDescription"
                    value={note.editDescription}
                    className="form-control"
                    id="editDescription"
                    onChange={onchange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={closebtn}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={
                  note.ediTitle.length < 5 || note.editDescription.length < 5
                    ? true
                    : false
                }
                onClick={() => {
                  HandleOnClick();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
