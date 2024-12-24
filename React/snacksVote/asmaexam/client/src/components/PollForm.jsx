import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

const PollForm = (props) => {
  const [question, setQuestion] = useState("");
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [optionThree, setOptionThree] = useState("");
  const [optionFour, setOptionFour] = useState("");
  const [errors, setErrors] = useState([]);

  const nav = useNavigate();
  const { setPolls } = props;
  const submitHandler = (e) => {
    e.preventDefault();

    const optionsArray = [
      { optionText: optionOne, votes: 0 },
      { optionText: optionTwo, votes: 0 },
      { optionText: optionThree, votes: 0 },
      { optionText: optionFour, votes: 0 },
    ].filter((option) => option[Object.keys(option)[0]].trim() !== "");
    const pollData = {
      question,
      options: optionsArray,
    };
    console.log("pollData Before Axios", pollData);

    axios
      .post("http://127.0.0.1:7000/api/poll", pollData)
      .then((res) => {
        console.log("✅ Poll Created", res.data);
        setPolls((prevPolls) => [...prevPolls, res.data]);
        nav("/");
      })
      .catch((err) => {
        const errorResponse = err.response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) {
          // Loop through all errors and get the messages
          errorArr.push(errorResponse[key].message);
        }
        // Set Errors
        setErrors(errorArr);
      });
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
      <Form onSubmit={submitHandler} className="form-style">
        {errors.map((err, index) => (
          <p key="{index}" style={{ color: "red" }}>
            {err}
          </p>
        ))}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>
            {" "}
            Your Question:<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>
            {" "}
            Option 1:<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            value={optionOne}
            onChange={(e) => setOptionOne(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>
            {" "}
            Option 2:<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            value={optionTwo}
            onChange={(e) => setOptionTwo(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label> Option 3:</Form.Label>
          <Form.Control
            value={optionThree}
            onChange={(e) => setOptionThree(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label> Option 4:</Form.Label>
          <Form.Control
            value={optionFour}
            onChange={(e) => setOptionFour(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit Poll
        </Button>
      </Form>
      <p style={{ color: "red", alignSelf: "flex-start", marginLeft: "10px" }}>
        * Indicates a required field
      </p>
    </div>
  );
};
export default PollForm;
