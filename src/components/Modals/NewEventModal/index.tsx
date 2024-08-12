import { FormEvent } from "react";
import ReactDOM from "react-dom";
import { NewTimeLineEvent } from "../../TimeLineEvent/TimeLineEvent.types";
import modalStyles from "../Modals.module.css";

export default function NewEventModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: NewTimeLineEvent) => void;
}) {
  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onSave({
      name: formData.get("name") as string,
      start: formData.get("start") as string,
      end: formData.get("end") as string,
    });
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={modalStyles.modalOverlay}>
      <form onSubmit={handleSave} className={modalStyles.modalContent}>
        <h2>Create New Event</h2>
        <label>
          Name:
          <input required type="text" name="name" />
        </label>
        <label>
          Start Date:
          <input required type="date" name="start" />
        </label>
        <label>
          End Date:
          <input required type="date" name="end" />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>,
    document.body // Render the modal at the root level
  );
}
