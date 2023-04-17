import { Container, Nav, Navbar, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaUserAlt } from "react-icons/fa";

// components/MainNav.js
export default function MainNav({ signOut, username }) {
  const router = useRouter();
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="fixed-top"
      >
        <Container>
          <Navbar.Brand className="text-muted">
            FRAGMENTS UI by Elena Bechmanis
          </Navbar.Brand>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="#" disabled>
              Hello, {username} &nbsp;
              <FaUserAlt />
            </Nav.Link>
            &nbsp;&nbsp; &nbsp;&nbsp;
            <Button variant="warning" onClick={signOut}>
              Sign out
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
