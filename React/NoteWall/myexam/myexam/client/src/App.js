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

  const DeleteThisNote = (deleteId) => {
    axios
      .delete("http://127.0.0.1:7000/api/note/" + deleteId)
      .then((res) => {
        //refrech();
        console.log(res.data);
        const filteredNotes = notes.filter((eachNote) => {
          return eachNote._id !== deleteId;
        });
        setNotes(filteredNotes);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
            element={<Update />}
            DeleteThisNote={DeleteThisNote}
          />
          <Route path="/notes/rand" element={<RandomNote />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
