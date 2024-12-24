import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const { polls, setPolls } = props;

  function refresh() {
    axios
      .get("http://127.0.0.1:7000/api/poll")
      .then((res) => {
        console.log(res.data);
        setPolls(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log("Polls in Dashboard: ", polls);
    refresh();
  }, []);
  // Separate polls into two arrays: firstPartPolls and secondPartPolls
  const firstPartPolls = polls.slice(0, 3);
  const secondPartPolls = polls.slice(3);

  return (
    <div>
      <div>
        <Link to={`/polls/new`}>
          <button>Create Your Own Poll</button>
        </Link>
      </div>
      <h1>Top 3 Polls</h1>

      {firstPartPolls &&
        firstPartPolls.map((poll, idx) => (
          <div key={idx} className="poll-card">
            <Link to={`/polls/${poll._id}`}>{poll.question}</Link>
            <div className="options-container">
              {poll.options.map((option, optionIdx) => (
                <div key={optionIdx} className="option-card">
                  <p>{option.optionText}</p>
                  <p>Votes: {option.votes}</p>
                </div>
              ))}
            </div>
            <hr />
          </div>
        ))}

      <h1>Recent Polls</h1>
      {secondPartPolls &&
        secondPartPolls.map((poll, idx) => (
          <div key={idx} className="poll-card">
            <Link to={`/polls/${poll._id}`}>{poll.question}</Link>
            <div className="options-container">
              {poll.options.map((option, optionIdx) => (
                <div key={optionIdx} className="option-card">
                  <p>{option.optionText}</p>
                  <p>Votes: {option.votes}</p>
                </div>
              ))}
            </div>
            <hr />
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
