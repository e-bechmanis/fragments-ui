import { useState, useEffect } from "react";
import { getUserFragments } from "../pages/api/api";
import Pagination from "react-bootstrap/Pagination";
import Accordion from "react-bootstrap/Accordion";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function FragmentsAccordion({ user }) {
  const [page, setPage] = useState(1);
  const [fragments, setFragments] = useState([]);

  const data = getUserFragments({ user });

  useEffect(() => {
    if (data) {
      setFragments(data);
    }
  }, [data]);

  function previous(e) {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  }

  function next(e) {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <>
      <h4 className="text-info"> Fragments Collection </h4>
      <Accordion defaultActiveKey="0">
        {fragments.length &&
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
                <strong>ID: </strong> {data.id}
                <br />
                <strong>Owner ID: </strong> {data.ownerId}
                <br />
                <strong>Created: </strong> {data.created}
                <br />
                <strong>Updated: </strong> {data.updated}
                <br />
                <strong>Type: </strong> {data.type}
                <br />
                <strong>Size: </strong> {data.size}
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
