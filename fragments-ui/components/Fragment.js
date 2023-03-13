import useSWR from "swr";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Error from "next/error";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { getFragmentById } from "../pages/api/api";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Fragment (components/Fragment.js)
export default function Fragment({ id }) {
  const { data, error } = useSWR(`${apiUrl}/v1/fragments/${id}/info`);

  if (error) return <Error statusCode={404} />;
  else if (!data) return null;
  else
    return (
      <>
        <Card className="rounded shadow-sm border-0 h-100">
          <Card.Body className="d-flex flex-column">
            <Card.Text className="text-muted">
              <strong>ID: </strong> {data.id}
              <br />
              <strong>Owner ID: </strong> {data.id}
              <br />
              <strong>Created: </strong> {data.id}
              <br />
              <strong>Updated: </strong> {data.id}
              <br />
              <strong>Type: </strong> {data.id}
              <br />
              <strong>Size: </strong> {data.id}
              <br />
              <br />
            </Card.Text>
            <Button
              onClick={getFragmentById(id)}
              className="mt-auto"
              variant="outline-warning"
            >
              Download Fragment data &nbsp;
              <BsBoxArrowUpRight className="float-end" />
            </Button>
          </Card.Body>
        </Card>
      </>
    );
}
