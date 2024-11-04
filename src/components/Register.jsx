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
  Box,
  Divider,
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
        padding: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          borderRadius: 3,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          transition: 'transform 0.3s ease',
          '&:hover': { transform: 'scale(1.02)' },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, color: '#52734d', mb: 2 }}
        >
          Create Account
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          sx={{ mb: 3 }}
        >
          Join us and start exploring beautiful orchids!
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
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: '#52734d' },
                "&:hover fieldset": { borderColor: '#86a77a' },
              },
            }}
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
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: '#52734d' },
                "&:hover fieldset": { borderColor: '#86a77a' },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              backgroundColor: "#52734d",
              fontWeight: "bold",
              mt: 2,
              py: 1.5,
              borderRadius: 3,
              "&:hover": { backgroundColor: '#6f8f68' },
            }}
          >
            Register
          </Button>
        </form>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" align="center">
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#52734d", textDecoration: "none" }}
          >
            Login here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
