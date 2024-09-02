import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../graphql/mutations";
import useAuth from "../../hooks/useAuth";

export const SignIn = () => {
  const navigate = useNavigate();

  useAuth("", "signin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const { access_token, refresh_token } = data.login;
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("refresh_token", refresh_token);
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleSubmit = () => {
    let valid = true;
    let emailError = "";
    let passwordError = "";

    if (!email) {
      emailError = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = "Invalid email address";
      valid = false;
    }

    if (!password) {
      passwordError = "Password is required";
      valid = false;
    }

    setErrors({ email: emailError, password: passwordError });

    if (valid) {
      login({
        variables: {
          loginUserInput: { email, password },
        },
      });
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        marginTop: { xs: "60px", sm: "80px", md: "120px" },
        display: "flex",
        justifyContent: "center",
        marginBottom: { xs: "60px", sm: "80px", md: "120px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "90%", sm: "400px", md: "454px" },
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "30px", sm: "35px", md: "45px" },
            fontWeight: 800,
            color: "#0565bb",
            fontStretch: "normal",
            letterSpacing: "normal",
            textShadow: "3px 0 #0565bb",
            width: "fit-content",
          }}
        >
          Welcome!
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "2px",
            background: "#222",
            marginTop: { xs: "30px", sm: "40px", md: "57px" },
          }}
        />

        <Box sx={{ width: "100%", marginTop: "20px" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            sx={{
              marginBottom: "20px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "inherit",
                },
              },
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            sx={{
              marginBottom: "20px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "inherit",
                },
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#0565bb",
              color: "#fff",
              padding: "12px 0",
              fontSize: { xs: "14px", md: "16px" },
              fontWeight: "bold",
              "&:hover ": {
                backgroundColor: "#0565bb",
              },
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
          {error && (
            <p style={{ color: "red" }}>Login failed: {error.message}</p>
          )}
        </Box>
        <Typography
          sx={{
            marginTop: "40px",
            fontSize: { xs: "12px", sm: "13px", md: "14px" },
            color: "#333",
          }}
        >
          Log in with your SNS account
        </Typography>
        <Box
          sx={{
            display: "flex",
            marginTop: "20px",
            gap: "10px",
            width: "100%",
          }}
        >
          {/* Add SNS login buttons here */}
        </Box>
        <Button
          variant="outlined"
          sx={{
            marginTop: "30px",
            padding: "12px 0",
            fontSize: { xs: "12px", sm: "13px", md: "14px" },
            fontWeight: "bold",
            color: "#333",
            borderColor: "#333",
            borderRadius: "0",
            width: "100%",
            "&:hover": {
              backgroundColor: "transparent",
              borderColor: "#333",
              color: "#333",
              boxShadow: "none",
            },
          }}
          onClick={() => navigate("/SignUp")}
        >
          Don't have an account? Register
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "20px",
            width: "100%",
            fontSize: { xs: "12px", sm: "13px", md: "14px" },
            color: "#0565bb",
          }}
        >
          <Typography>Find ID (Email)</Typography>
          <Typography>Find Password</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
