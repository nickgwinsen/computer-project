"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import isEmail from "validator/lib/isEmail";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config/constants";
import { useAuth } from "../providers/authProvider";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import UnauthenticatedRoute from "@/components/UnauthenticatedRoute";

const Login = () => {
  const { setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const authRequest = async () => {
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
        setIsAuthenticated(true);
        localStorage.setItem("token", response.data.access_token);
        router.push("/");
      } else {
        throw new Error(response.data.code || "Authentication Failed!");
      }
    } catch (error) {
      setEmailError("Incorrect email or password. Please try again.");
      console.error("Login failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    await authRequest();
  };

  return (
    <UnauthenticatedRoute>
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <Box mt={2}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                error={!!emailError}
                helperText={emailError}
                variant="outlined"
                margin="normal"
                slotProps={{
                  inputLabel: { sx: { color: "#fff" } },
                  input: { sx: { color: "#fff" } },
                }}
                sx={{
                  backgroundColor: "#1b1d24",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fff",
                    borderWidth: "2px",
                  },
                }}
              />
            </form>
          </Box>
          <Box mt={2}>
            <form onSubmit={handleSubmit}>
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
                slotProps={{
                  inputLabel: { sx: { color: "#fff" } },
                  input: { sx: { color: "#fff" } },
                }}
                sx={{
                  backgroundColor: "#1b1d24",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fff",
                    borderWidth: "2px",
                  },
                }}
              />
            </form>
          </Box>
          <Box mt={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Log in
            </Button>
            <Typography variant="body1" sx={{ mt: 2 }}>
              No account? <Link href={"/register"}>Sign up.</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </UnauthenticatedRoute>
  );
};

export default Login;
