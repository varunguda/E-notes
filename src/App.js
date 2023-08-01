import "./App.css";
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
            <div
              className="container"
              style={{ marginTop: "90px" }}
              data-bs-theme="dark"
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </Router>
        </NoteState>
      </AuthState>
    </div>
  );
}

export default App;
