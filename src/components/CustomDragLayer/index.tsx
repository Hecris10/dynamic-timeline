import { addDays, differenceInDays, parseISO } from "date-fns";
import React from "react";
import { useDragLayer } from "react-dnd";
import "./CustomDragLayer.css";

interface TimelineItemData {
  id: number;
  start: string;
  end: string;
  name: string;
}

interface CustomDragLayerProps {
  minDate: Date;
  totalDays: number;
  rows: TimelineItemData[][];
}

const CustomDragLayer: React.FC<CustomDragLayerProps> = ({
  minDate,

  rows,
}) => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getClientOffset(),
  }));

  if (!isDragging || !currentOffset || !item) {
    return null;
  }

  const gridStartX =
    document.querySelector(".timeline-grid")?.getBoundingClientRect().left || 0;
  const adjustedX = currentOffset.x - gridStartX;

  const daysToMove = Math.floor(adjustedX / 100); // Use Math.floor for better precision
  const potentialStart = addDays(parseISO(item.start), daysToMove);
  const potentialEnd = addDays(parseISO(item.end), daysToMove);
  const startDayIndex = differenceInDays(potentialStart, minDate);
  const spanDays = differenceInDays(potentialEnd, potentialStart) + 1;

  let rowIndex = 0;
  for (rowIndex; rowIndex < rows.length; rowIndex++) {
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
      break;
    }
  }

  return (
    <div
      className="timeline-placeholder"
      style={{
        gridColumnStart: startDayIndex + 1,
        gridColumnEnd: `span ${spanDays}`,
        gridRowStart: rowIndex + 1,
        pointerEvents: "none", // Ensure it doesn't interfere with dragging
      }}
    />
  );
};

export default CustomDragLayer;
