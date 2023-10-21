import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [Information, setInformation] = useState({ email: "", password: "" });
  let navigateTo = useNavigate();

  const submitBTN = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_Host}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // It is important to send the body during POST, otherwise we cant get the data .

        body: JSON.stringify({
          email: Information.email,
          password: Information.password,
        }),
      }
    );

    // logindata is a object
    const loginData = await response.json();

    // console.log(loginData);

    if (loginData.JWT_TOKEN) {
      // If the token is provided in logindata then we need to set the token to the local storage
      localStorage.setItem("TOKEN", loginData.JWT_TOKEN);

      // Show alert when the token is valid or present
      props.showalert("Login Successfully", "success");

      // Redirect to the Home page where user can see there own notes
      navigateTo("/");
    } else {
      props.showalert("Please try again", "danger");
    }
  };

  const onchange = (e) => {
    setInformation({ ...Information, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-2">
      <h2 className="text-center">Welcome to Notebook App</h2>
      <form onSubmit={submitBTN}>
        {/* onsubmit only work on form  */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={Information.email}
            className="form-control"
            id="email"
            name="email"
            onChange={onchange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onchange}
            id="password"
            value={Information.password}
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary button-62">
          Login
        </button>
      </form>
    </div>
  );
}
