import React from "react";
import "./App.css";
import Content from "./components/content";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import AuthState from "./context/auth/AuthState";

function App() {
  return (
    <div className="App">
      <AuthState>
        <NoteState>
          <Router>
            <Navbar />
            <Content>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </Content>
          </Router>
        </NoteState>
      </AuthState>
    </div>
  );
}

export default App;
