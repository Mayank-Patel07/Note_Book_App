import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
  const { showalert } = props;
  const [Information, setInformation] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  let navigateTo = useNavigate();

  const submitBTN = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_Host}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Information.name,
        email: Information.email,
        password: Information.password,
      }),
    });
    const loginData = await response.json();
    // console.log(loginData);
    if (loginData.JWT_TOKEN) {
      localStorage.setItem("TOKEN", loginData.JWT_TOKEN);
      showalert("Login Successfully", "success");
      navigateTo("/");
    } else {
      showalert("Invalid credentials", "danger");
    }
  };

  const onchange = (e) => {
    setInformation({ ...Information, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-2">
      <h2 className="text-center">Create an account to continue</h2>
      <form onSubmit={submitBTN}>
        <div className="mb-1">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            name="name"
            value={Information.name}
            className="form-control"
            id="name"
            onChange={onchange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-1">
          <label htmlFor="email" className="form-label">
            Email{" "}
          </label>
          <input
            type="email"
            className="form-control"
            value={Information.email}
            id="email"
            name="email"
            onChange={onchange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-1">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={Information.password}
            className="form-control"
            minLength="5"
            id="password"
            onChange={onchange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="confirm_password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            value={Information.confirm_password}
            className="form-control"
            name="confirm_password"
            minLength="5"
            onChange={onchange}
            id="confirm_password"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary button-62"
          disabled={
            Information.email.length < 5 ||
            Information.password.length < 5 ||
            Information.name.length < 5
              ? true
              : false
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
}
