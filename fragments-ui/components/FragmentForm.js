import { Button, Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import { postUserFragment } from "../pages/api/api";

export default function FragmentForm({ user }) {
  const [fragment, setFragment] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      postUserFragment({ user }, fragment);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h4 className="yellow-text">Add Fragment here</h4>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <br />
          <Form.Group className="mb-3">
            <Form.Select>
              <option>Choose fragment type</option>
              <option>text</option>
              <option>application/json</option>
            </Form.Select>
          </Form.Group>

          <FloatingLabel controlId="floatingFragment" label="Add your fragment">
            <Form.Control
              type="text"
              id="text-fragment"
              name="text-fragment"
              placeholder="Copy your text or json fragment here"
              onChange={(e) => setFragment(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <br />
        <Button variant="outline-secondary" type="submit" className="float-end">
          Add Fragment
        </Button>
      </Form>
      <br />
      <br />
    </>
  );
}
