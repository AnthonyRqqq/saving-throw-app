import { Modal, Button } from "react-bootstrap";

export default function DeleteModal({ onClose, onClick, show, onHide }) {
  return (
    <>
      <Modal show={show} onHide={onHide} className="centeredModal">
        <div className="deleteModal">
          <Modal.Header>
            <Modal.Title className="pt-3">Are you sure you want to delete this?</Modal.Title>
          </Modal.Header>

          <Modal.Body className="d-flex justify-content-center">
            <Button
              onClick={() => {
                onClick();
                if (onClose) {
                  onClose();
                }
              }}
              variant="danger"
              style={{ whiteSpace: "nowrap" }}
            >
              Yes! Get rid of it!
            </Button>

            <Button
              onClick={onClose}
              variant="secondary"
              style={{ whiteSpace: "nowrap" }}
            >
              On second thought...
            </Button>
          </Modal.Body>

          <Modal.Footer></Modal.Footer>
        </div>
      </Modal>
    </>
  );
}
