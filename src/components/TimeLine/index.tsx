import React from "react";
import { useDrop } from "react-dnd";

import { addDays, differenceInDays, parseISO } from "date-fns";
import CustomDragLayer from "../CustomDragLayer";
import TimelineItem from "../TimeLineItem";
import "./Timeline.css";

export interface TimelineItemData {
  id: number;
  start: string;
  end: string;
  name: string;
}

interface TimelineProps {
  items: TimelineItemData[];
  onDrop: (item: TimelineItemData, newStart: string, newEnd: string) => void;
}

const Timeline: React.FC<TimelineProps> = ({ items, onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: "timeline-item",
    drop: (draggedItem: TimelineItemData, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const daysToMove = Math.floor(delta.x / 100); // Adjust this value to fit your grid
        const newStart = addDays(parseISO(draggedItem.start), daysToMove);
        const newEnd = addDays(parseISO(draggedItem.end), daysToMove);
        onDrop(
          draggedItem,
          newStart.toISOString().split("T")[0],
          newEnd.toISOString().split("T")[0]
        );
      }
    },
  }));

  const minDate = parseISO(
    items.reduce(
      (min, item) => (item.start < min ? item.start : min),
      items[0].start
    )
  );
  const maxDate = parseISO(
    items.reduce((max, item) => (item.end > max ? item.end : max), items[0].end)
  );
  const totalDays = differenceInDays(maxDate, minDate) + 1;

  const rows: TimelineItemData[][] = [];

  items.forEach((item) => {
    const startDayIndex = differenceInDays(parseISO(item.start), minDate);
    const spanDays =
      differenceInDays(parseISO(item.end), parseISO(item.start)) + 1;
    let placed = false;

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];
      if (
        row.every((existingItem) => {
          const existingStart = differenceInDays(
            parseISO(existingItem.start),
            minDate
          );
          const existingEnd =
            differenceInDays(parseISO(existingItem.end), minDate) + 1;
          return (
            startDayIndex >= existingEnd ||
            startDayIndex + spanDays <= existingStart
          );
        })
      ) {
        row.push(item);
        placed = true;
        break;
      }
    }

    if (!placed) {
      rows.push([item]);
    }
  });

  return (
    <div
      ref={drop}
      className="timeline-grid"
      style={{
        gridTemplateColumns: `repeat(${totalDays}, minmax(100px, 1fr))`,
      }}
    >
      <CustomDragLayer minDate={minDate} totalDays={totalDays} rows={rows} />
      {rows.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((item) => {
            const startDayIndex = differenceInDays(
              parseISO(item.start),
              minDate
            );
            const spanDays =
              differenceInDays(parseISO(item.end), parseISO(item.start)) + 1;
            return (
              <div
                key={item.id}
                className="timeline-item"
                style={{
                  gridColumnStart: startDayIndex + 1,
                  gridColumnEnd: `span ${spanDays}`,
                  gridRowStart: rowIndex + 1,
                }}
              >
                <TimelineItem item={item} />
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Timeline;
