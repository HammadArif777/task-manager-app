import { useDispatch, useSelector } from "react-redux";
import { themeSelector } from "../../features/generals/generalSelector";

const ConfirmationModal = ({
  modalTitle,
  modalDescription,
  onHandleSaveChanges,
  onClose,
}) => {
  const { fontColor, themeColor } = useSelector(themeSelector);
  return (
    <div className="modal d-block" tabIndex={-1}>
      <div
        className="modal-dialog"
        style={{ backgroundColor: themeColor, color: fontColor }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{modalTitle}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>{modalDescription}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              onClick={onHandleSaveChanges}
              type="button"
              className="btn btn-primary"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationModal;
