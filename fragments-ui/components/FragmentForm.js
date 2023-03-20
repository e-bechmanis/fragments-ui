import { Button, Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import { postUserFragment } from "../pages/api/api";

export default function FragmentForm(props) {
  const [fragment, setFragment] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
  }

  async function handleSubmit(e) {
    try {
      await postUserFragment(props.user, selectedOption, fragment);
      console.log("Posted a fragment");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h4 className="text-info">Add Fragment</h4>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <br />
          <Form.Group className="mb-3">
            <Form.Select onChange={handleOptionChange}>
              <option>Choose fragment type</option>
              <option value="text/plain">text/plain</option>
              <option value="text/markdown">text/markdown</option>
              <option value="text/html">text/html</option>
              <option value="application/json">application/json</option>
            </Form.Select>
          </Form.Group>

          <FloatingLabel label="Add your fragment">
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
