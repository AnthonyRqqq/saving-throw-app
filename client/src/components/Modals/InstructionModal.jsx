import { Modal, Button, Form } from "react-bootstrap";

export default function InstructionModal({
  show,
  instructionText,
  onHide,
  style,
  onClick,
}) {
  return (
    <>
      <Modal
        className="centeredModal"
        show={show}
        onHide={onHide}
        style={style}
      >
        <div className="instructionModal">
          <Modal.Header>
            <Modal.Title>Instructions</Modal.Title>
          </Modal.Header>

          <Modal.Body className="text-center" style={{ fontSize: "large" }}>
            {instructionText}
          </Modal.Body>

          <Form.Check
            id="showAgainCheckbox"
            className="instructionModalShowAgain"
            type="checkbox"
            label="Don't show again?"
          ></Form.Check>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={onClick}
              className="link-item"
              style={{ textDecoration: "underline", fontSize: "larger" }}
            >
              Got it!
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}
