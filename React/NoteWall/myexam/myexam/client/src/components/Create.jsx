import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);

  const nav = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      title,
      body,
    };
    axios
      .post("http://127.0.0.1:7000/api/note", obj)
      .then((res) => {
        console.log("✅✅✅✅", res.data);
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
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <legend>
            <h1>Write Notes</h1>
            <Link to={`/`} className="beautiful-button">
              Go Back Home
            </Link>
          </legend>
          <div>
            <h3>Write a new Note!</h3>
          </div>
          <Form onSubmit={submitHandler} className="form-style">
            <div className="mb-3">
              {errors.map((err, index) => (
                <p key="{index}" style={{ color: "red" }}>
                  {err}
                </p>
              ))}
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Note Title</Form.Label>
              <Form.Control
                type="text"
                as="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Note Body</Form.Label>
              <Form.Control
                type="text"
                as="input"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Write this Note!
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Create;
