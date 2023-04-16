import { Button, Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import { updateUserFragment } from "../pages/api/api";

export default function UpdateForm({ user, id, type }) {
  const [fragment, setFragment] = useState("");
  const [file, setFile] = useState(null);

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (type.startsWith("image/") && file) {
        const formData = new FormData();
        formData.append("fragment", file);
        await updateUserFragment(user, type, id, formData);
      } else if (
        type.startsWith("text/") ||
        type.startsWith("application/json")
      ) {
        await updateUserFragment(user, type, id, fragment);
      } else {
        throw new Error("Invalid fragment type");
      }
      console.log("Updated a fragment");
      setFragment("");
      setFile(null);
    } catch (err) {
      console.log(err);
    }
  }

  const isText =
    type && (type.startsWith("text/") || type === "application/json");
  const isImage = type && type.startsWith("image/");

  return (
    <>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <br />
          {isText && (
            <FloatingLabel label="Copy your updated fragment here and click 'Update'">
              <Form.Control
                type="text"
                id="text-fragment"
                name="text-fragment"
                value={fragment}
                onChange={(e) => setFragment(e.target.value)}
              />
            </FloatingLabel>
          )}

          {isImage && (
            <Form.Group className="mb-3">
              <Form.Label>
                Drag and drop your image here or choose a file
              </Form.Label>
              <br />
              <Form.Control
                type="file"
                onChange={handleFileChange}
                accept={type}
              />
            </Form.Group>
          )}
        </Form.Group>
        <br />
        <Button variant="outline-primary" type="submit" className="float-end">
          Update
        </Button>
      </Form>
    </>
  );
}
