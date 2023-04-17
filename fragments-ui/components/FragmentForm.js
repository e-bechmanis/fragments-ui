import { Button, Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import { postUserFragment } from "../pages/api/api";
import { useAtom } from "jotai";
import { fragmentsAtom } from "../store";
import { getUserFragments } from "../pages/api/api";

export default function FragmentForm({ user }) {
  const [fragment, setFragment] = useState("");
  const [fragments, setFragments] = useAtom(fragmentsAtom);
  const [selectedOption, setSelectedOption] = useState("");
  const [file, setFile] = useState(null);

  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function updateFragments() {
    await getUserFragments(user).then((data) => {
      setFragments(data);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (selectedOption.startsWith("image/") && file) {
        const formData = new FormData();
        formData.append("fragment", file);
        await postUserFragment(user, selectedOption, formData, true);
        await updateFragments();
      } else if (
        selectedOption.startsWith("text/") ||
        selectedOption === "application/json"
      ) {
        await postUserFragment(user, selectedOption, fragment);
        await updateFragments();
      } else {
        throw new Error("Invalid fragment type");
      }
      console.log("Posted a fragment");
      setFragment("");
      setFile(null);
      setSelectedOption("");
    } catch (err) {
      console.log(err);
    }
  }

  const isTextOrJsonSelected =
    selectedOption.startsWith("text/") || selectedOption === "application/json";
  const isImageSelected = selectedOption.startsWith("image/");
  const isFormValid =
    selectedOption !== "" &&
    ((isTextOrJsonSelected && fragment !== "") ||
      (isImageSelected && file !== null));

  return (
    <>
      <h4 className="text-info">Add Fragment</h4>
      <hr />

      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <br />
          <Form.Group className="mb-3">
            <Form.Select onChange={handleOptionChange} value={selectedOption}>
              <option>Choose fragment type</option>
              <option value="text/plain">text/plain</option>
              <option value="text/markdown">text/markdown</option>
              <option value="text/html">text/html</option>
              <option value="application/json">application/json</option>
              <option value="image/png">image/png</option>
              <option value="image/jpeg">image/jpeg</option>
              <option value="image/webp">text/webp</option>
              <option value="image/gif">image/gif</option>
            </Form.Select>
          </Form.Group>

          {isTextOrJsonSelected && (
            <FloatingLabel label="Add your fragment">
              <Form.Control
                type="text"
                id="text-fragment"
                name="text-fragment"
                placeholder="Copy your text or json fragment here"
                value={fragment}
                onChange={(e) => setFragment(e.target.value)}
              />
            </FloatingLabel>
          )}

          {isImageSelected && (
            <Form.Group className="mb-3">
              <Form.Label>
                Drag and drop your image here or choose a file
              </Form.Label>
              <br />
              <Form.Control
                type="file"
                onChange={handleFileChange}
                accept={selectedOption}
              />
            </Form.Group>
          )}
        </Form.Group>
        <br />
        <Button
          variant="outline-secondary"
          type="submit"
          className="float-end"
          disabled={!isFormValid}
        >
          Add Fragment
        </Button>
      </Form>
      <br />
      <br />
    </>
  );
}
