import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const Dashboard = (props) => {
  const { polls, setPolls } = props;

  useEffect(() => {
    console.log("Polls in Dashboard: ", polls);
    refresh();
  }, []);

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

  return (
    <div>
      <div>
        <Link to={`/polls/new`}>
          <Button variant="info" style={{ marginBottom: "8px" }}>
            Create Your Own Poll
          </Button>
        </Link>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "5px" }}>
          <h1>Top 3 Polls</h1>
          {Array.isArray(polls) &&
            polls.slice(0, 3).map((poll, idx) => (
              <div key={idx} className="poll-card">
                <Link to={`/polls/${poll._id}`}>{poll.question}</Link>
                <div className="options-container">
                  {Array.isArray(poll?.options) &&
                    poll.options.map((option, optionIdx) => (
                      <div key={optionIdx}>
                        <p>
                          {option.optionText} {option.votes} Votes
                        </p>
                      </div>
                    ))}
                </div>
                <hr />
              </div>
            ))}
        </div>

        <div style={{ marginLeft: "5px" }}>
          <h1>Recent Polls</h1>
          {Array.isArray(polls) &&
            polls.slice(3).map((poll, idx) => (
              <div key={idx} className="poll-card">
                <Link to={`/polls/${poll._id}`}>{poll.question}</Link>
                <div className="options-container">
                  {Array.isArray(poll?.options) &&
                    poll.options.map((option, optionIdx) => (
                      <div key={optionIdx}>
                        <p>
                          {option.optionText} {option.votes} Votes{" "}
                        </p>
                      </div>
                    ))}
                </div>
                <hr />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
