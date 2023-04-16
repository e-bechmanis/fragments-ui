import { useState, useEffect } from "react";
import { getUserFragments } from "../pages/api/api";
import Pagination from "react-bootstrap/Pagination";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { FiDelete } from "react-icons/fi";

export default function FragmentsAccordion(user) {
  const [page, setPage] = useState(1);
  const [fragments, setFragments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await getUserFragments(user).then((data) => {
        console.log("This is what the function is returning");
        console.log(data);
        setFragments(data);
      });
    }
    fetchData();
  }, [fragments]);

  function previous(e) {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  }

  function next(e) {
    setPage((prevPage) => prevPage + 1);
  }

  function handleDelete(id) {
    // Logic to delete fragment with the given id
  }

  function handleUpdate(id) {
    // Logic to update fragment with the given id
  }

  return (
    <>
      <h4 className="text-info"> Fragments Collection </h4>
      <Accordion defaultActiveKey="0">
        {fragments &&
          fragments.length > 0 &&
          fragments.map((fragment) => (
            <Accordion.Item
              className="accordion-item"
              eventKey={fragment.id}
              key={fragment.id}
            >
              <Accordion.Header>
                <strong>{fragment.id}</strong> &nbsp;{" "}
                <span className="grey-text">
                  - Fragment type: {fragment.type}
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <strong>ID: </strong> {fragment.id}
                <br />
                <strong>Owner ID: </strong> {fragment.ownerId}
                <br />
                <strong>Created: </strong> {fragment.created}
                <br />
                <strong>Updated: </strong> {fragment.updated}
                <br />
                <strong>Type: </strong> {fragment.type}
                <br />
                <strong>Size: </strong> {fragment.size}
                <br />
                <div className="float-end">
                  <Button
                    variant="outline-primary"
                    onClick={() => handleUpdate(fragment.id)}
                  >
                    Update
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(fragment.id)}
                  >
                    Delete &nbsp;
                    <FiDelete />
                  </Button>
                </div>
                <br />
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
      <br />
      <Pagination>
        <Pagination.Prev className="accordion-header" onClick={previous} />
        <Pagination.Item className="accordion-header">{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
