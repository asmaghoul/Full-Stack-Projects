import "./App.css";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Create from "./components/Create";
import Update from "./components/Update";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RandomNote from "./components/RandomNote";

function App() {
  const [notes, setNotes] = useState([]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Dashboard notes={notes} setNotes={setNotes} />}
          />
          <Route path="/notes/new" element={<Create />} />
          <Route
            path="/notes/:id"
            element={<Update notes={notes} setNotes={setNotes} />}
          />
          <Route path="/notes/rand" element={<RandomNote />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
