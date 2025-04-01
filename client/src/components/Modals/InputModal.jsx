import { Modal, Button, Row } from "react-bootstrap";

export default function InputModal({
  onClose,
  onClick,
  onChange,
  show,
  onHide,
  inputTitle,
  confirmText,
  inputElements = [],
}) {
  return (
    <Modal show={show} onHide={onHide} className="centeredModal">
      <div className="deleteModal">
        <Modal.Header>
          <Modal.Title className="pt-3">{inputTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            {inputElements.map((element) => {
              return (
                <div key={element}>
                  <div style={{ textAlign: "center" }}>{element.text}</div>
                  <input onChange={onChange}></input>
                </div>
              );
            })}
          </Row>

          <Row style={{ display: "flex", justifyContent: "center" }}>
            <div className="d-flex">
              <Button
                style={{ whiteSpace: "nowrap" }}
                onClick={() => {
                  onClick();
                  if (onClose) {
                    onClose();
                  }
                }}
              >
                {confirmText}
              </Button>

              <Button onClick={onClose}>Cancel</Button>
            </div>
          </Row>
        </Modal.Body>
      </div>
    </Modal>
  );
}
