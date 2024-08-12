import { addDays, differenceInDays, parseISO } from "date-fns";
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import CustomDragLayer from "../CustomDragLayer";
import TimelineItem from "../TimeLineItem";

export interface TimelineItemData {
  id: number;
  start: string;
  end: string;
  name: string;
}

const Timeline = ({ events }: { events: TimelineItemData[] }) => {
  const [items, setItems] = useState(events);

  const handleDrop = (
    item: TimelineItemData,
    newStart: string,
    newEnd: string
  ) => {
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id ? { ...i, start: newStart, end: newEnd } : i
      )
    );
  };

  const [, drop] = useDrop(() => ({
    accept: "timeline-item",
    drop: (draggedItem: TimelineItemData, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const daysToMove = Math.floor(delta.x / 100); // Adjust this value to fit your grid
        const newStart = addDays(parseISO(draggedItem.start), daysToMove);
        const newEnd = addDays(parseISO(draggedItem.end), daysToMove);
        handleDrop(
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

  const handleUpdateItem = (updatedItem: TimelineItemData) => {
    const newItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(newItems);

    // Update items
  };

  const handleDeleteItem = (deletedItem: TimelineItemData) => {
    const newItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(newItems);
  };

  return (
    <div
      ref={drop}
      className="grid grid-rows-1 gap-3 p-3 overflow-x-auto"
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
                style={{
                  gridColumnStart: startDayIndex + 1,
                  gridColumnEnd: `span ${spanDays}`,
                  gridRowStart: rowIndex + 1,
                }}
              >
                <TimelineItem
                  item={item}
                  updateItem={handleUpdateItem}
                  deleteItem={handleDeleteItem}
                />
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Timeline;
