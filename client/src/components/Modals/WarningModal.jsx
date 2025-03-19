import { Modal, Button } from "react-bootstrap";

export default function WarningModal({
  onClose,
  onClick,
  show,
  onHide,
  warning,
}) {
  return (
    <>
      <Modal show={show} onHide={onHide} className="centeredModal">
        <div className="warningModal">
          <Modal.Header>
            <Modal.Title className="pt-3" style={{ textAlign: "cemnter " }}>
              <div>Warning</div>
              <div>{warning}</div>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="d-flex justify-content-center">
            <Button
              onClick={() => {
                onClick();
                if (onClose) onClose();
              }}
              style={{ whiteSpace: "nowrap" }}
            >
              Yes! I know what I'm doing!
            </Button>

            <Button onClick={onClose} style={{ whiteSpace: "nowrap" }}>
              On second thought...
            </Button>
          </Modal.Body>

          <Modal.Footer></Modal.Footer>
        </div>
      </Modal>
    </>
  );
}
