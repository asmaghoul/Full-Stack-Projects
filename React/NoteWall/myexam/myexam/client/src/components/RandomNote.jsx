import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const RandomNote = () => {
  const [randomNote, setRandomNote] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:7000/api/note/rand")
      .then((res) => {
        console.log(res.data);
        setRandomNote(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setRandomNote]);

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <legend>
            <h1>Note Wall</h1>
            <Link to={`/`} className="beautiful-button">
              Go Back Home
            </Link>
            <h3>Hello</h3>
            <h4>This is a note</h4>
          </legend>

          {randomNote ? (
            <Card className="form-style">
              <Card.Body></Card.Body>
              <Card.Title>{randomNote.title}</Card.Title>
              <Card.Text>{randomNote.body}</Card.Text>
              <Card.Footer className="mb-2 text-muted">
                {format(new Date(randomNote.createdAt), "dd/MM/yyyy HH:mm:ss")}
              </Card.Footer>
            </Card>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default RandomNote;
