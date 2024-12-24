import "./App.css";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import PollForm from "./components/PollForm";
import OnePoll from "./components/OnePoll";
import OptionsVotes from "./components/OptionsVotes";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [polls, setPolls] = useState([]);

  const PollDetails = () => {
    return (
      <div>
        <Routes>
          <Route path="/" element={<OnePoll />} />
          <Route path="options-votes" element={<OptionsVotes />} />
        </Routes>
      </div>
    );
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Dashboard polls={polls} setPolls={setPolls} />}
          />
          <Route
            path="/polls/new"
            element={<PollForm polls={polls} setPolls={setPolls} />}
          />
          <Route path="/polls/:id/*" element={<PollDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
