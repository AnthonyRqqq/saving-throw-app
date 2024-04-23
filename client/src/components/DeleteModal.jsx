import { useMutation } from "@apollo/client";
import { REMOVE_FANTASY_LOCATION } from "../utils/mutations";

export default function DeleteModal({
  userId,
  fantasyLocationId,
  onConfirm,
  onClose,
  deleteConfirm,
}) {
  const [removeFantasyLocation] = useMutation(REMOVE_FANTASY_LOCATION);

  const handleRemoveFantasyLocation = async () => {
    try {
      await removeFantasyLocation({
        variables: { id: userId, fantasyLocationId: fantasyLocationId },
      });

      if (onConfirm) {
        onConfirm(); // Trigger any additional behavior upon confirmation
      }
    } catch (err) {
      console.error("Error removing fantasy location: ", err);
    }
  };

  return (
    <div
      className={`modal fade ${deleteConfirm ? "show" : ""}`}
      id="confirmModal"
      tabIndex="-1"
      role="dialog"
      aria-hidden={!deleteConfirm}
      style={{ display: deleteConfirm ? "block" : "none" }} // Ensure display is set
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content deleteModal">
          <div className="modal-body">
            Are you sure you want to delete this?
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                handleRemoveFantasyLocation();
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
    </div>
  );
}
