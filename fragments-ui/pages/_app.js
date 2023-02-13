import { Authenticator } from "@aws-amplify/ui-react";
import { getUserFragments } from "./api/api";
import { Auth, getUser } from "../lib/auth";
import { Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { postUserFragment } from "./api/api";
import "@aws-amplify/ui-react/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  function connectToApi() {
    getUser().then((user) => {
      console.log(user);
      getUserFragments(user);
    });
  }

  const [fragment, setFragment] = useState("");
  const [warning, setWarning] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    getUser().then((user) => {
      try {
        postUserFragment(user, fragment);
      } catch (err) {
        setWarning(err.message);
      }
    });
  }

  return (
    <Authenticator signUpAttributes={["email", "name"]}>
      {({ signOut, user }) => (
        <>
          <Card
            style={{
              width: "25rem",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10rem",
            }}
            onLoad={connectToApi()}
          >
            <Card.Title>
              Hello {user.username}
              <br />
              <br />
            </Card.Title>

            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Fragment</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  id="text-fragment"
                  name="text-fragment"
                  onChange={(e) => setFragment(e.target.value)}
                />
              </Form.Group>

              {warning && (
                <>
                  <br />
                  <Alert variant="danger">{warning}</Alert>
                </>
              )}

              <br />
              <Button variant="outline-secondary" type="submit">
                Add
              </Button>
            </Form>

            <Button
              style={{ marginTop: "2rem" }}
              variant="warning"
              onClick={signOut}
            >
              Sign out
            </Button>
          </Card>
        </>
      )}
    </Authenticator>
  );
}
