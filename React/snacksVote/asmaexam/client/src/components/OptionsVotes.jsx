import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { BiInfoCircle, BiX } from "react-icons/bi";

const OptionsVotes = ({ pollId }) => {
  const [pollData, setPollData] = useState(null);
  const { id } = useParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:7000/api/poll/${id}`)
      .then((res) => {
        console.log(res.data);
        setPollData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const closeSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  return (
    <div>
      <div>
        <Link to={`/`}>
          <Button variant="info" style={{ marginBottom: "8px" }}>
            Back to Home
          </Button>
        </Link>
      </div>
      <div>
        {showSuccessMessage && (
          <Alert
            variant="success"
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <BiInfoCircle size={40} style={{ marginRight: "8px" }} />
              Thanks for Voting! Here are the results.
            </div>
            <Button onClick={closeSuccessMessage} variant="outline-success">
              <BiX size={20} />
            </Button>
          </Alert>
        )}
      </div>
      {pollData ? (
        <Card className="info-card">
          <Card.Body>
            <h2>{pollData.question}</h2>
            {pollData.options.map((option, optionIdx) => (
              <div key={optionIdx} className="info-item">
                <h6 style={{ display: "inline-block", marginRight: "10px" }}>
                  {option.optionText}
                </h6>
                <h6 style={{ display: "inline-block" }}>
                  {option.votes} Votes
                </h6>
              </div>
            ))}
          </Card.Body>
        </Card>
      ) : (
        <h3>Loading</h3>
      )}
    </div>
  );
};

export default OptionsVotes;
