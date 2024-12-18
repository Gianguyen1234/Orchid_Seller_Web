// src/App.jsx
import "./App.css";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import OrchidDetail from "./components/OrchidDetail";
import About from "./components/About";
import FooterInfo from "./components/FooterInfo";
import Contact from "./components/Contact";
import Login from "./components/Login";
import EditProfile from "./components/EditProfile";
import Register from "./components/Register"; // Import your Register component
import Protected from "./components/services/Protected";
import DashBoard from "./components/DashBoard";

const App = () => {
  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<OrchidDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/natural" element={<></>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/dashboard" element={<Protected><DashBoard /></Protected>} />      
      </Routes>
      <FooterInfo />
    </div>
  );
};

export default App;
