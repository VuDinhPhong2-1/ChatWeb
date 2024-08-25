import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  additionalAddress?: string;
  contact?: string;
  termsAccepted?: string;
}

export const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [additionalAddress, setAdditionalAddress] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8 || password.length > 12) {
      newErrors.password = "Password must be 8-12 characters long";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!address) {
      newErrors.address = "Address is required";
    }

    if (!additionalAddress) {
      newErrors.additionalAddress = "Additional address is required";
    }

    if (!contact) {
      newErrors.contact = "Contact is required";
    } else if (!/^[0-9]+$/.test(contact)) {
      newErrors.contact = "Invalid contact number";
    }

    if (!termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Form is valid, submit data");
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

        <Box sx={{ width: "100%", marginTop: "20px" }}>
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
            placeholder="8-12 characters including letters, numbers, special characters"
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
          <TextField
            fullWidth
            variant="outlined"
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={!!errors.address}
            helperText={errors.address}
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
            label="Additional Address"
            value={additionalAddress}
            onChange={(e) => setAdditionalAddress(e.target.value)}
            error={!!errors.additionalAddress}
            helperText={errors.additionalAddress}
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
            label="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            error={!!errors.contact}
            helperText={errors.contact}
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
