import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import format from "date-fns/format";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";

const Dashboard = (props) => {
  const { notes, setNotes } = props;
  function refrech() {
    axios
      .get("http://127.0.0.1:7000/api/note")
      .then((res) => {
        console.log(res.data);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    refrech();
  }, []);

  return (
    <div>
      <div>
        <span>
          <h1>Note Wall</h1>
        </span>
        <span>
          <Button variant="success" className="beautiful-button">
            <Link to={`/notes/new`} className="button-link">
              Write Note
            </Link>
          </Button>
        </span>
        <h3>Leave a Note</h3>
        <hr />
      </div>

      {notes.map((oneNt, idn) => {
        const date = oneNt.createdAt;
        return (
          <Card className="form-style" key={idn}>
            <Card.Body></Card.Body>
            <Card.Title>
              <Link
                style={{
                  textDecorationLine: "none",
                  fontSize: "larger",
                  fontWeight: "bold",
                }}
                to={"/student/" + oneNt._id}
              >
                {oneNt.title}
              </Link>
            </Card.Title>
            <Card.Text>{oneNt.body}</Card.Text>
            <Card.Footer className="mb-2 text-muted">
              {format(new Date(date), "dd/MM/yyyy HH:mm:ss")}
            </Card.Footer>
            <Card.Link
              href={`/notes/${oneNt._id}`}
              style={{ textDecorationLine: "none" }}
            >
              {" "}
              <Button variant="primary">Edit</Button>{" "}
            </Card.Link>
          </Card>
        );
      })}
      <Button variant="success" className="beautiful-button">
        <Link to={`/notes/rand`} className="button-link">
          Random Note
        </Link>
      </Button>
    </div>
  );
};

export default Dashboard;
