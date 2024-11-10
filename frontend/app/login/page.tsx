"use client";
import React, { useState } from "react";
import axios from "axios";
import isEmail from "validator/lib/isEmail";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config/constants";
import { useAuth } from "../providers/authProvider";
//import { useNavigate } from 'react-router-dom'

//TODO: update typing later
const Login = () => {
  const { isAuthenticated } = useAuth();
  const [loading, isLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  //  const navigate = useNavigate()
  const router = useRouter();

  if (isAuthenticated) {
    router.push("/");
    return <div>loading...</div>;
  }

  const authRequest = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        router.push("/");
      } else {
        throw new Error(response.data.code || "Authentication Failed!");
      }
    } catch (error) {
      console.error("Login failed:", error);
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
