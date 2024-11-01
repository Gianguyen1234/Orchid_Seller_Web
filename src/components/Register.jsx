import React, { useState } from "react";
import { UserAuth } from "./services/AuthContext";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { registerWithEmail } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmail(email, password);
      toast.success("User registered successfully", {
        position: "top-center",
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            helperText="We'll never share your email."
            sx={{ bgcolor: "white" }}
          />

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            helperText="Use at least 6 characters."
            sx={{ bgcolor: "white" }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              mt: 2,
            }}
          >
            Register
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <Link to="/login" variant="body2" color="primary">
            Login here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
