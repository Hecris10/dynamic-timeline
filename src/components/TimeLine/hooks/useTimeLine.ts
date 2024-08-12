import { addDays, differenceInDays, parseISO } from "date-fns";
import { useState } from "react";
import { useDrop } from "react-dnd";
import { generateId, getMonthHeaders } from "../../../lib/utils";
import { NewTimelineItem, TimelineItemData } from "../types";

export const useTimeLine = (events: TimelineItemData[]) => {
  const [items, setItems] = useState(events);
  const [zoom, setZoom] = useState(1);
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
  };

  const handleDeleteItem = (deletedItem: TimelineItemData) => {
    const newItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(newItems);
  };

  const handleNewItem = (newItem: NewTimelineItem) => {
    const newId = generateId(items);
    const newItems = [
      ...items,
      {
        id: newId,
        start: newItem.start,
        end: newItem.end,
        name: newItem.name,
      },
    ];
    setItems(newItems);
  };

  const zoomIn = () => {
    if (zoom <= 19) setZoom((prevZoom) => prevZoom + 1);
  };

  const zoomOut = () => {
    if (zoom >= 2) setZoom((prevZoom) => prevZoom - 1);
  };

  const monthHeaders = getMonthHeaders(minDate, totalDays);

  return {
    handleNewItem,
    handleDeleteItem,
    handleUpdateItem,
    zoomOut,
    zoomIn,
    rows,
    totalDays,
    minDate,
    monthHeaders,
    drop,
    items,
    zoom,
  };
};
