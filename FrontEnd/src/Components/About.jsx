import React from "react";

function About() {
  return (
    <div className="container">
      <div className=" container text-center">
        <h2>About This Website</h2>
        <div className="container text-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS345lf6cdfChMihpFmTB4JWrjRZssZ8V6lCA&usqp=CAU"
            alt=""
          />
        </div>
      </div>
      <div className="container my-2">
        <strong>
          This is a MERN (MongoDB, Express.js, React.js, Node.js) application,
          utilizing the latest technology stack. The app employs JWT for
          authentication and includes separate login and sign-up functionalities
          for individual users. Once users create an account, they can save
          their notes using their user ID and password. Data is stored in a
          MongoDB database, and the entire backend is developed using Express.js
          and the frontend created using React.js, one of the trending
          technology.
        </strong>
      </div>
    </div>
  );
}

export default About;
