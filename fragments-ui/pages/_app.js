import { Authenticator } from "@aws-amplify/ui-react";
import { getUserFragments } from "./api/api";
import { Auth, getUser } from "../lib/auth";
import { Container, Row, Col } from "react-bootstrap";
import MainNav from "../components/MainNav";
import FragmentForm from "../components/FragmentForm";

import "@aws-amplify/ui-react/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  async function connectToApi() {
    await getUser().then((user) => {
      console.log(user);
      getUserFragments(user);
    });
  }

  return (
    <Authenticator signUpAttributes={["email", "name"]}>
      {({ signOut, user }) => (
        <>
          <MainNav signOut={signOut} username={user.username} />
          <Container>
            <br />
            <br />
            <br />
            <br />
            <Row>
              <Col>
                <FragmentForm user={user} />
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </>
      )}
    </Authenticator>
  );
}
