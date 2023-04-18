import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useAtom } from "jotai";
import { fragmentsAtom } from "../store";
import { getFragmentById } from "../pages/api/api";

export default function ViewFragment({ user }) {
  const [fragments, setFragments] = useAtom(fragmentsAtom);
  const [selectedFragment, setSelectedFragment] = useState();
  const [type, setType] = useState("N/A");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function handleFragmentChange(event) {
    setSelectedFragment(event.target.value);
  }

  function handleTypeChange(event) {
    setType(event.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await getFragmentById({ user }, selectedFragment, type);
      setType("N/A");
      setModalData(data.data);
      if (data.type.startsWith("image")) {
        const imageUrl = URL.createObjectURL(data.data);
        console.log(imageUrl);
        setImageUrl(imageUrl);
      }
      setShowModal(true);
      console.log("GET request was successful");
    } catch (err) {
      console.log(err);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <>
      <h4 className="text-info">View Fragments</h4>
      <hr />
      <br />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Label>
            Select <em>Fragment ID</em> to view the data
          </Form.Label>
          <Form.Select onChange={handleFragmentChange} value={selectedFragment}>
            <option>-</option>
            {fragments &&
              fragments.length > 0 &&
              fragments.map((fragment) => <option>{fragment.id}</option>)}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Select <em>extension</em> if you want the data to be converted
          </Form.Label>
          <Form.Select onChange={handleTypeChange} value={type}>
            <option value="N/A">N/A</option>
            <option value=".txt">.txt</option>
            <option value=".md">.md</option>
            <option value=".html">.html</option>
            <option value=".json">.json</option>
            <option value=".png">.png</option>
            <option value=".jpeg">.jpeg</option>
            <option value=".webp">.webp</option>
            <option value=".gif">.gif</option>
          </Form.Select>
        </Form.Group>
        <br />
        {type == "N/A" && (
          <Button
            variant="outline-secondary"
            type="submit"
            className="float-end"
          >
            View Data
          </Button>
        )}
        {type != "N/A" && (
          <Button variant="outline-primary" type="submit" className="float-end">
            View Converted Data
          </Button>
        )}
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Fragment Data</Modal.Title>
        </Modal.Header>
        {imageUrl && <img src={imageUrl} alt="Fetched Image" />}
        {modalData && !imageUrl && <Modal.Body>{modalData}</Modal.Body>}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <br />
      <br />
    </>
  );
}
