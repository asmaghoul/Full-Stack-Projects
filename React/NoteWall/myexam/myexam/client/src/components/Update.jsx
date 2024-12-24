import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";

const Update = (props) => {
  const nav = useNavigate();
  const { id } = useParams();
  const { DeleteThisNote } = props;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:7000/api/note/" + id)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
        setBody(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const updateHandler = (e) => {
    e.preventDefault();
    const newObj = {
      title,
      body,
    };
    axios
      .patch(`http://127.0.0.1:7000/api/note/${id}`, newObj)
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
            <h1>Note</h1>
            <Link to={`/`} className="beautiful-button">
              Go Back Home
            </Link>
          </legend>

          <Form onSubmit={updateHandler} className="form-style">
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
            <Button variant="primary">Edit Note</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              onClick={() => {
                DeleteThisNote(id);
              }}
              variant="danger"
            >
              Delete Note
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Update;
