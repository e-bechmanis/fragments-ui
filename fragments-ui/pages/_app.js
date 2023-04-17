import { Authenticator } from "@aws-amplify/ui-react";
import { Auth, getUser } from "../lib/auth";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MainNav from "../components/MainNav";
import FragmentForm from "../components/FragmentForm";
import FragmentsAccordion from "../components/FragmentsAccordion";
import ViewFragment from "../components/ViewFragments";

import "@aws-amplify/ui-react/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [userJwt, setUserJwt] = useState({});

  useEffect(() => {
    // Making sure that we don't keep propagating this API call if user has already been set
    if (Object.keys(userJwt).length === 0 && userJwt.constructor === Object) {
      connectToApi();
    }
  }, [userJwt]);

  async function connectToApi() {
    const user = await Auth.currentAuthenticatedUser();
    const simplifiedUser = await getUser(user);
    setUserJwt(simplifiedUser);
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
              {Object.keys(userJwt).length !== 0 && (
                <>
                  <Col>
                    <FragmentForm user={userJwt} />
                    <ViewFragment user={userJwt} />
                  </Col>
                  <Col>
                    <FragmentsAccordion user={userJwt} />
                  </Col>
                </>
              )}
            </Row>
          </Container>
        </>
      )}
    </Authenticator>
  );
}
