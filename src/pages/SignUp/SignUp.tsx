import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ApolloError, useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../../graphql/mutations";

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  age?: string;
  termsAccepted?: string;
  general?: string;
}

export const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [receiveAds, setReceiveAds] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const navigate = useNavigate();

  useAuth("", "signup");

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6 || password.length > 12) {
      newErrors.password = "Password must be 6-12 characters long";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!name) {
      newErrors.name = "Name is required";
    }

    if (!age) {
      newErrors.age = "Age is required";
    } else if (isNaN(Number(age)) || Number(age) <= 0) {
      newErrors.age = "Invalid age";
    }

    if (!termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        await createUser({
          variables: {
            input: {
              name,
              age: Number(age),
              email,
              password,
            },
          },
        });
        navigate("/signin");
      } catch (error: ApolloError | unknown) {
        if (error instanceof ApolloError && error.graphQLErrors.length > 0) {
          const graphqlError = error.graphQLErrors[0];
          if (
            graphqlError.message.includes("This email is already registered")
          ) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: "This email is already registered.",
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              general: "An unexpected error occurred. Please try again.",
            }));
          }
        } else {
          console.error("Unexpected error:", error);
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: "An unexpected error occurred. Please try again.",
          }));
        }
      }
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
          JOIN US
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "2px",
            background: "#222",
            marginTop: { xs: "30px", sm: "40px", md: "57px" },
          }}
        />

        {errors.general && (
          <Typography color="error" variant="body2" sx={{ marginTop: "20px" }}>
            {errors.general}
          </Typography>
        )}

        <Box sx={{ width: "100%", marginTop: "20px" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Name *"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
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
            label="Age *"
            type="number"
            placeholder="Your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            error={!!errors.age}
            helperText={errors.age}
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
            label="Email ID *"
            placeholder="example@email.com"
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
            label="Password *"
            type="password"
            placeholder="6-12 characters including letters, numbers, special characters"
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
          <TextField
            fullWidth
            variant="outlined"
            label="Confirm Password *"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
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
        </Box>

        <Box
          sx={{
            width: "100%",
            marginTop: "20px",
            borderTop: "1px solid #222",
            paddingTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                sx={{
                  "&.Mui-checked": {
                    color: "#333",
                  },
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              />
            }
            label="I agree to the terms of service and privacy policy. (Required)"
            sx={{
              marginBottom: "10px",
              color: "#333",
              fontSize: { xs: "12px", sm: "14px" },
            }}
          />
          {errors.termsAccepted && (
            <Typography color="error" variant="caption">
              {errors.termsAccepted}
            </Typography>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={receiveAds}
                onChange={(e) => setReceiveAds(e.target.checked)}
                sx={{
                  "&.Mui-checked": {
                    color: "#333",
                  },
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              />
            }
            label="I agree to receive advertisements and emails. (Optional)"
            sx={{ color: "#333", fontSize: { xs: "12px", sm: "14px" } }}
          />
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{
            marginTop: "30px",
            padding: "12px 0",
            backgroundColor: "#0565bb",
            color: "#fff",
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: "bold",
            borderRadius: "0",
            "&:hover": {
              backgroundColor: "#045fa7",
            },
          }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};
