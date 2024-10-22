"use client";
import React, { useState } from "react";
const { isEmail } = require("validator");
//import { useNavigate } from 'react-router-dom'

//TODO: update typing later
const Login = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //  const navigate = useNavigate()

  const authRequest = async (email: string, password: string) => {
    try {
      console.log(email, password);
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        console.log("Success! Token stored.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onButtonClick = async () => {
    setEmailError("");
    setPasswordError("");

    if (email === "") {
      setEmailError("Enter an email");
      return;
    }

    if (!isEmail(email)) {
      setEmailError("Enter a valid email");
      return;
    }

    if (password === "") {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Minimum length 8 not reached.");
      return;
    }

    await authRequest(email, password);
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
    </div>
  );
};

export default Login;
