import React from "react";
import Notes from "./Notes";
import Addnote from "./Addnote";

export default function Home(props) {
  const { showalert } = props;
  return (
    <div>
      <Addnote showalert={showalert} />
      <Notes showalert={showalert} />
    </div>
  );
}
