"use client";
import React, { useState } from "react";
import axios from "axios";
import isEmail from "validator/lib/isEmail";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config/constants";
import { useAuth } from "../providers/authProvider";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  InputLabel,
} from "@mui/material";

const Login = () => {
  const { isAuthenticated } = useAuth();
  const [loading, isLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Box mt={2}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            error={!!emailError}
            helperText={emailError}
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              style: { color: "#fff" }, // Label color
            }}
            InputProps={{
              style: { color: "#fff" }, // Input text color
            }}
          />
        </Box>
        <Box mt={2}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            variant="outlined"
            margin="normal"
          />
        </Box>
        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onButtonClick}
          >
            Log in
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
