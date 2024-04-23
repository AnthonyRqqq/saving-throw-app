export default function DeleteModal({ onClose, onClick }) {
  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content deleteModal">
        <div className="modal-body">Are you sure you want to delete this?</div>
        <div className="modal-footer justify-content-center">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              onClick();
              if (onClose) {
                onClose(); // Close modal after confirming
              }
            }}
            data-bs-dismiss="modal"
          >
            Yes! Get rid of it!
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={onClose} // Properly close the modal
          >
            On second thought...
          </button>
        </div>
      </div>
    </div>
  );
}
