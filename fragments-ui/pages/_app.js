import { Authenticator } from "@aws-amplify/ui-react";
import { getUserFragments } from "./api/api";
import { Auth, getUser } from "../lib/auth";
import { Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { postUserFragment } from "./api/api";
import { useAtom } from "jotai";
import { fragmentsAtom } from "../store";

import "@aws-amplify/ui-react/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [fragment, setFragment] = useState("");
  const [warning, setWarning] = useState("");
  const [fragments, setFragments] = useAtom(fragmentsAtom);

  async function connectToApi() {
    await getUser().then((user) => {
      console.log(user);
      getUserFragments(user);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await getUser().then((user) => {
      try {
        postUserFragment(user, fragment);
        setFragments(getUserFragments(user));
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
              width: "30rem",
              padding: "2rem",
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

            <Form onSubmit={(e) => handleSubmit(e)}>
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
                Add Fragment
              </Button>
            </Form>
            <br />
            <br />
            {fragments && <p className="text-muted">Fragments List</p>}

            {fragments.map((fragment) => (
              <ul>
                <li className="text-muted">{fragment}</li>
              </ul>
            ))}

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
