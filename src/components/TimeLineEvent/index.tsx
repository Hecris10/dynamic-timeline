import { FormEvent, useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { formatDate } from "../../lib/utils";
import styles from "./TimeLineEvent.module.css";
import { TimeLineEvent } from "./TimeLineEvent.types";

const TimelineEvent = ({
  event,
  onEdit,
  onDelete,
}: {
  event: TimeLineEvent;
  onEdit: (updatedEvent: TimeLineEvent) => void;
  onDelete: (deletedEvent: TimeLineEvent) => void;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    // @ts-expect-error event target
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setIsDropdownOpen(false);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newName = e.currentTarget.name;
    console.log(newName);
    setIsEditing(false);
    onEdit({ ...event, name: newName });
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const newName = e.target.value;
    setIsEditing(false);
    onEdit({ ...event, name: newName });
  };

  return (
    <div
      className={styles.timelineEvent}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.dropdownMenu} ref={dropdownRef}>
        <button className={styles.dropdownMenuButton} onClick={toggleDropdown}>
          <HiOutlineDotsVertical />
        </button>
        {isDropdownOpen && (
          <div className={styles.dropdownMenuContent}>
            <button
              className={styles.dropdownMenuItem}
              onClick={handleEditClick}
            >
              <FaPencil /> Edit
            </button>
            <button
              className={styles.dropdownMenuItem}
              onClick={() => onDelete(event)}
            >
              <FaTrash /> Delete
            </button>
          </div>
        )}
      </div>
      <div className={styles.timelineEventContent}>
        {isEditing ? (
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <input
              type="text"
              name="name"
              defaultValue={event.name}
              onBlur={(e) => handleInputBlur(e)}
              autoFocus
            />
          </form>
        ) : (
          <span
            className={styles.timelineEventName}
          >{`${event.id} - ${event.name}`}</span>
        )}
        <span className={styles.timelineEventDates}>
          {formatDate(event.start)} - {formatDate(event.end)}
        </span>
      </div>
      {isTooltipVisible && (
        <div className={styles.tooltip}>
          <div>{event.name}</div>
          <div>
            {formatDate(event.start)} - {formatDate(event.end)}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineEvent;
