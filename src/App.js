import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import {
  Route,
  Routes,
  BrowserRouter as Router
} from 'react-router-dom';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <div className="App">
      <NoteState>
        <Router>
          <Navbar />
            <div className="container" style={{marginTop:'90px'}}  data-bs-theme="dark">
              <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/about' element={<About />}/>
              </Routes>
            </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
