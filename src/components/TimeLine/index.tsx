import { useState } from "react";
import { colors } from "../../config/colors";
import { arrangeEventsInLanes, isEventDuplicate } from "../../lib/utils";
import NewEventModal from "../Modals/NewEventModal";
import TimelineEvent from "../TimeLineEvent";
import {
  NewTimeLineEvent,
  TimeLineEvent,
} from "../TimeLineEvent/TimeLineEvent.types";
import styles from "./TimeLine.module.css";

export default function TimeLine({ events }: { events: TimeLineEvent[] }) {
  const [zoom, setZoom] = useState(1); // Initial zoom level
  const [items, setItems] = useState<TimeLineEvent[]>(events);
  const [openNewEventModal, setOpenNewEventModal] = useState(false);

  const handleZoomIn = () => {
    if (zoom < 20) setZoom(zoom + 1);
  };

  const handleZoomOut = () => {
    if (zoom > 1) {
      setZoom(zoom - 1);
    }
  };

  const onOpenNewEventModal = () => {
    setOpenNewEventModal(true);
  };

  const onCloseNewEventModal = () => {
    setOpenNewEventModal(false);
  };

  const handleSaveNewEvent = (event: NewTimeLineEvent) => {
    const isDuplicate = isEventDuplicate(items, event);
    if (isDuplicate) {
      alert("Event already exists!");
      return;
    }
    const newIndex = items[items.length - 1].id + 1;
    const newEvent = { ...event, id: newIndex };
    setItems([...items, newEvent]);
    setOpenNewEventModal(false);
  };

  const handleEditEvent = (event: TimeLineEvent) => {
    const index = items.findIndex((item) => item.id === event.id);
    const newItems = [...items];
    newItems[index] = event;
    setItems(newItems);
  };

  const handleDeleteEvent = (event: TimeLineEvent) => {
    const newItems = items.filter((item) => item.id !== event.id);
    setItems(newItems);
  };

  const sortedItems = items.sort((a, b) => {
    const dateA = new Date(a.start);
    const dateB = new Date(b.start);
    return dateA.getTime() - dateB.getTime();
  });

  // Arrange events in lanes
  const lanes = arrangeEventsInLanes(items);

  console.log(lanes);

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.headerBar}>
        <h1>Timeline</h1>
        <button onClick={onOpenNewEventModal}>Create New Event</button>
      </div>
      <div className={styles.zoomControls}>
        <button name="Zoom out" disabled={zoom <= 1} onClick={handleZoomOut}>
          -
        </button>
        <span>Zoom: {zoom}x</span>
        <button name="Zoom in" disabled={zoom >= 20} onClick={handleZoomIn}>
          +
        </button>
      </div>
      <div className={styles.timeline}>
        <div
          className={styles.timelineLane}
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(${
              150 * zoom
            }px, 1fr))`,
          }}
        >
          {lanes.map((lane: TimeLineEvent[], laneIndex: number) => {
            return lane.map((event, eventIndex: number) => {
              const start: Date = new Date(event.start);
              const end: Date = new Date(event.end);
              const timelineStart: Date = new Date(sortedItems[0].start);

              const daysFromStart: number = Math.ceil(
                (start.getTime() - timelineStart.getTime()) /
                  (1000 * 60 * 60 * 24)
              );
              const span: number =
                Math.ceil(
                  (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
                ) + 1;
              const backgroundColor: string =
                colors[eventIndex % colors.length]; // Cycle through colors

              return (
                <div
                  className={styles.timelineEventWrapper}
                  key={eventIndex}
                  style={{
                    gridColumnStart: daysFromStart + 1, // Calculate column start based on days from timeline start
                    gridColumnEnd: `span ${span}`,
                    gridRowStart: laneIndex + 1, // Use lane index for row start
                    padding: 0,
                    backgroundColor: backgroundColor, // Set background color
                  }}
                >
                  <TimelineEvent
                    event={event}
                    onEdit={handleEditEvent}
                    onDelete={handleDeleteEvent}
                  />
                </div>
              );
            });
          })}
        </div>
      </div>
      <NewEventModal
        isOpen={openNewEventModal}
        onClose={onCloseNewEventModal}
        onSave={handleSaveNewEvent}
      />
    </div>
  );
}
