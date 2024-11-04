import React, { useEffect, useState } from 'react';
import { UserAuth } from './services/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './services/firebase';
import { FaGoogle } from 'react-icons/fa';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Box,
} from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      navigate("/dashboard");
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={5} lg={4}>
          <Card
            elevation={10}
            sx={{
              borderRadius: 3,
              paddingX: 4,
              paddingY: 6,
              backgroundColor: '#fff',
              boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                align="center"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: '#52734d',
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                }}
              >
                Welcome Back
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="textSecondary"
                sx={{ mb: 3 }}
              >
                Sign in to continue
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#52734d',
                      },
                      '&:hover fieldset': {
                        borderColor: '#86a77a',
                      },
                    },
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{
                    borderRadius: 2,
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#52734d',
                      },
                      '&:hover fieldset': {
                        borderColor: '#86a77a',
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: 3,
                    backgroundColor: '#52734d',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    '&:hover': { backgroundColor: '#6f8f68' },
                  }}
                >
                  Login
                </Button>
                <Divider sx={{ my: 3, color: 'textSecondary' }}>or</Divider>
                <Button
                  onClick={handleGoogleSignIn}
                  variant="outlined"
                  fullWidth
                  startIcon={<FaGoogle />}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    color: '#52734d',
                    borderColor: '#52734d',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: 'rgba(82, 115, 77, 0.1)',
                      borderColor: '#86a77a',
                      color: '#6f8f68',
                    },
                  }}
                >
                  Sign in with Google
                </Button>
              </form>
              <Typography
                align="center"
                variant="body2"
                sx={{ mt: 3, color: '#52734d' }}
              >
                New user?{' '}
                <a href="/register" style={{ color: '#6f8f68', textDecoration: 'none' }}>
                  Create an account
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
