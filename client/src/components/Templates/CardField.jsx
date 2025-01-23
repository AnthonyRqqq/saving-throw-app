import { Row, Col } from "react-bootstrap";

export default function CardField({ title, content }) {
  return (
    <Row className="spellCardField">
      <Col>
        {title && <div className="fieldTitle">{title}</div>}{" "}
        {content && content}
      </Col>
    </Row>
  );
}
