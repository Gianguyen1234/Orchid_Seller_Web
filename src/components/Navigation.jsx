import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography, AppBar, Toolbar } from "@mui/material";
import { UserAuth } from './services/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Navigation() {
  const { user, logOut } = UserAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/');  // Redirect to home or login after logout
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
  }, [user]);

  return (
    <AppBar position="static" sx={{ bgcolor: "transparent", boxShadow: "none" }}>
      <Toolbar sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 3,
        background: "linear-gradient(to right, #d4e9b4, #f9f4a8)",
        boxShadow: 3,
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "#f0f8e2"
        }
      }}>
        
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
            <HomeIcon sx={{
              fontSize: 30,
              color: "#3e4b3b",
              transition: "color 0.3s, transform 0.3s",
              "&:hover": { color: "#2e7d32", transform: "scale(1.1)" }
            }} />
            <Typography variant="h5" component="h1" sx={{
              ml: 1,
              fontFamily: "Georgia, serif",
              color: "#3e4b3b",
              transition: "color 0.3s",
              "&:hover": { color: "#2e7d32" }
            }}>
              Orchids Seller
            </Typography>
          </Link>
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Link to="/about" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <InfoIcon sx={{
              fontSize: 24,
              color: "#4b4b4b",
              transition: "color 0.3s, transform 0.3s",
              "&:hover": { color: "#ff8a65", transform: "rotate(15deg) scale(1.1)" }
            }} />
            <Typography variant="button" sx={{ color: "#4b4b4b", ml: 0.5, "&:hover": { color: "#ff8a65" } }}>Our Story</Typography>
          </Link>
          <Link to="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <DashboardIcon sx={{
              fontSize: 24,
              color: "#4b4b4b",
              transition: "color 0.3s, transform 0.3s",
              "&:hover": { color: "#42a5f5", transform: "rotate(-15deg) scale(1.1)" }
            }} />
            <Typography variant="button" sx={{ color: "#4b4b4b", ml: 0.5, "&:hover": { color: "#42a5f5" } }}>Dashboard</Typography>
          </Link>
          <Link to="/contact" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <ContactMailIcon sx={{
              fontSize: 24,
              color: "#4b4b4b",
              transition: "color 0.3s, transform 0.3s",
              "&:hover": { color: "#ffca28", transform: "rotate(15deg) scale(1.1)" }
            }} />
            <Typography variant="button" sx={{ color: "#4b4b4b", ml: 0.5, "&:hover": { color: "#ffca28" } }}>Contact</Typography>
          </Link>
          {/* Conditionally Render Register Link */}
          {!user && (
            <Link to="/register" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
              <PersonAddIcon />
              <Typography variant="button">Register</Typography>
            </Link>
          )}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          {user ? (
            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.email} src={user.photoURL} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px", "& .MuiPaper-root": { borderRadius: 2, boxShadow: 3 } }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>Dashboard</Link>
                  </Typography>
                </MenuItem>
                {/* Edit Profile Link */}
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to="/edit-profile" style={{ textDecoration: "none", color: "inherit" }}>Edit Profile</Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary" sx={{ borderRadius: 2 }}>
                Sign in
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
