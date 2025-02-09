import { Modal, Button } from "react-bootstrap";
import "./DeleteModal.css";

export default function DeleteModal({ onClose, onClick, show, onHide }) {
  return (
    <>
      <Modal show={show} onHide={onHide} className="centeredModal">
        <div className="deleteModal">
          <Modal.Header>
            <Modal.Title className="pt-3" style={{ textAlign: "center" }}>
              <div>Are you sure you want to delete this?</div>
              <div>This action cannot be undone.</div>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="d-flex justify-content-center">
            <Button
              onClick={() => {
                onClick();
                if (onClose) {
                  onClose();
                }
              }}
              style={{ whiteSpace: "nowrap" }}
            >
              Yes! Get rid of it!
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
