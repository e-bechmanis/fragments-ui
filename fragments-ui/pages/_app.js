import { Authenticator } from "@aws-amplify/ui-react";
import { Auth, getUser } from "../lib/auth";
import { Container, Row, Col } from "react-bootstrap";
import MainNav from "../components/MainNav";
import FragmentForm from "../components/FragmentForm";
import FragmentsAccordion from "../components/FragmentsAccordion";

import "@aws-amplify/ui-react/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const userJwt = getUser();

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
                <FragmentForm user={userJwt} />
              </Col>
              <Col>
                <FragmentsAccordion user={userJwt} />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </Authenticator>
  );
}
