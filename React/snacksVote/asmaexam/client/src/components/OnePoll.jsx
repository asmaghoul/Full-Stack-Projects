import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const OnePoll = () => {
  const { id } = useParams();
  const [thisPoll, setPoll] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:7000/api/poll/${id}`)
      .then((res) => {
        console.log(res.data);
        setPoll(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const voteHandler = (optionId) => {
    axios
      .patch(`http://127.0.0.1:7000/api/poll/${id}/vote/${optionId}`)
      .then((response) => {
        console.log("Vote successful", response.data);
        // Update the local state to reflect the new vote count
        const updatedPoll = { ...thisPoll };
        const votedOptionIndex = updatedPoll.options.findIndex(
          (option) => option._id === optionId
        );
        updatedPoll.options[votedOptionIndex].votes++;
        setPoll(updatedPoll);
        navigate(`/polls/${id}/options-votes`);
      })
      .catch((error) => {
        console.error("Error voting", error);
      });
  };
  const buttonColors = ["warning", "info", "success", "danger"];
  return (
    <div>
      {thisPoll ? (
        <div>
          <h3>{thisPoll.question}</h3>
          <div>
            {thisPoll.options.map((option, optionIdx) => (
              <Card key={optionIdx} className="mb-3">
                <Card.Body>
                  <Card.Title>{option.optionText}</Card.Title>
                  <Button
                    variant={buttonColors[optionIdx % buttonColors.length]}
                    onClick={() => voteHandler(option._id)}
                  >
                    Vote {option.optionText}
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <h3>Loading</h3>
      )}
    </div>
  );
};

export default OnePoll;
