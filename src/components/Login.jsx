import React, { useEffect, useState } from 'react';
import { UserAuth } from './services/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './services/firebase'; // Import auth here
import { FaGoogle } from 'react-icons/fa';
import "../assets/css/Login.css";

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
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleSubmit} className="login-form">
          <h3>Welcome Back</h3>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn-modern">
              Login
            </button>
          </div>

          <button onClick={handleGoogleSignIn} className="btn-google">
            <span className="google-icon-container">
              <FaGoogle className="google-icon" />
            </span>
            Sign in with Google
          </button>

          <div className="register-link">
            <p>
              New user? <a href="/register">Create an account</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
