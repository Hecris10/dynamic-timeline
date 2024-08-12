import { addDays, differenceInDays, parseISO } from "date-fns";
import { useDragLayer } from "react-dnd";
import { CustomDragLayerProps } from "../types";

export const useCustomDragLayer = ({ minDate, rows }: CustomDragLayerProps) => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getClientOffset(),
  }));

  const gridStartX =
    document.querySelector(".timeline-grid")?.getBoundingClientRect().left || 0;
  const adjustedX = (currentOffset?.x || 0) - gridStartX;

  const daysToMove = Math.floor(adjustedX / 100); // Use Math.floor for better precision
  const potentialStart =
    item?.start && daysToMove
      ? addDays(parseISO(item.start), daysToMove)
      : new Date();
  const potentialEnd =
    item?.end && daysToMove
      ? addDays(parseISO(item.end), daysToMove)
      : new Date();
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

  return {
    startDayIndex,
    spanDays,
    rowIndex,
    isDragging,
    currentOffset,
    item,
  };
};
