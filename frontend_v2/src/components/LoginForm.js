import React, { useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { CartStore } from "./CartContext";
import axios from "axios";

const theme = createTheme();

function LoginForm() {
  const util = useContext(CartStore);
  const [error, setError] = useState("");
  const navTo = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      util.setClick(true);
      if (event.target.getAttribute("use") == "guest") {
        console.log("guest");
        navTo("/");
      } else if (event.target.getAttribute("use") == "signup") {

        console.log("signup");
          //set user in backend
          const signupObj = {
            email:data.get("email"),
            password:data.get("password"),
          }
          const token = await axios.post('/user/signup', signupObj);
          // console.log(token.data);
          localStorage.setItem("flipkartToken",token.data.accessToken)
  
          navTo("/");

      } else if (event.target.getAttribute("use") == "login") {
        
        console.log("login");

        //set user in backend
        const signupObj = {
          email:data.get("email"),
          password:data.get("password"),
        }
        const token = await axios.post('/user/login', signupObj);
        // console.log(token.data);
        localStorage.setItem("flipkartToken",token.data.accessToken)
        navTo("/");

      }
    } catch (err) {

      console.log(err.message);
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 2000);

    }

    util.setClick(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in / Sign up
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box
            component="form"
            onClick={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={util.clicked}
              use="guest"
            >
                Login In As Guest
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              type="submit"
              disabled={util.clicked}
              use="login"
            >
                Login
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              use="signup"
              type="submit"
              disabled={util.clicked}
            >
                Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginForm;
