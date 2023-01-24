import { Authenticator } from "@aws-amplify/ui-react";
import { getUserFragments } from "./api/api";
import { Auth, getUser } from "../lib/auth";
import { Card, Button } from "react-bootstrap";
import "@aws-amplify/ui-react/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  function connectToApi() {
    getUser().then((user) => {
      console.log(user);
      getUserFragments(user);
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
            <Card.Title>Hello {user.username}</Card.Title>
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
