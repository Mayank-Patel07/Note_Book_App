import React, { useContext } from "react";
import Createcontext from "../Context/Createcontext";

export default function NotesItem(props) {
  const Context_notes = useContext(Createcontext);
  const { deleteNote } = Context_notes;
  // const { title, description, _id , editnote } = props;
  const { editnote, element, showalert } = props;
  const ran_num = Math.round(Math.random() * 4);
  const ran_img = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOMARAtu-uQTpPK6qAlJC2pj7Q5yv7aDUmVQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS345lf6cdfChMihpFmTB4JWrjRZssZ8V6lCA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMhc-VFo7nQZMIDeJOBLEeJ4VIl7vEQJ5moA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA8tp9zg5SdhtR02sf982DnWpkGR1X3KlFoQ&usqp=CAU",
  ];

  return (
    <div className="col-md-3">
      <div className="card my-2">
        <img
          src={
            ran_img[ran_num]
              ? ran_img[ran_num]
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP-JrpSIO00-r6k4D6DCvAf9IqxDYJs79gsw&usqp=CAU"
          }
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{element.title}</h5>
          <p className="card-text">{element.description}</p>
          <i
            className="fa-solid fa-trash mx-3 "
            onClick={() => {
              deleteNote(element._id);
              showalert("Note Delete Successfully", "danger");
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => {
              editnote(element);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}
