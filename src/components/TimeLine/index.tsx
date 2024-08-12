import { addDays, differenceInDays, parseISO } from "date-fns";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { generateId, getMonthHeaders } from "../../lib/utils";
import CustomDragLayer from "../CustomDragLayer";
import { TimeLineHeader } from "../TimeLineHeader";
import TimelineItem from "../TimeLineItem";
import { Button } from "../ui/button";

export interface TimelineItemData {
  id: number;
  start: string;
  end: string;
  name: string;
}

export interface NewTimelineItem {
  name: string;
  start: string;
  end: string;
}

export interface TimelineProps {
  events: TimelineItemData[];
}

const Timeline = ({ events }: { events: TimelineItemData[] }) => {
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

  return (
    <div className="relative bg-zinc-100">
      <TimeLineHeader onSave={handleNewItem} />
      <div className="absolute flex gap-3 bottom-8 right-2">
        <Button disabled={zoom >= 20} variant="outline" onClick={zoomIn}>
          <PlusIcon size={24} />
        </Button>
        <Button disabled={zoom <= 1} variant="outline" onClick={zoomOut}>
          <MinusIcon size={24} />
        </Button>
      </div>
      <div className="w-full overflow-y-auto h-[93vh]  px-6">
        <div
          ref={drop}
          className="grid grid-rows-1 gap-3 h-[92vh] p-3 overflow-x-auto"
          style={{
            gridTemplateColumns: `repeat(${totalDays}, minmax(${
              250 * zoom
            }px, 1fr))`,
            gridTemplateRows: `repeat(${rows.length + 1}, 0.5fr)`,
          }}
        >
          {monthHeaders.map((header, index) => (
            <div
              key={index}
              className="text-lg font-bold text-center text-gray-700"
              style={{ gridColumn: `span ${header.startDayIndex}` }}
            >
              {header.monthYear}
            </div>
          ))}

          <CustomDragLayer
            minDate={minDate}
            totalDays={totalDays}
            rows={rows}
          />
          {Array.from({ length: totalDays }).map((_, index) => (
            <div
              key={index}
              className="text-sm text-center text-gray-500"
              style={{ gridColumn: index + 1 }}
            >
              {addDays(minDate, index).toLocaleDateString()}
            </div>
          ))}
          {rows.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((item) => {
                const startDayIndex = differenceInDays(
                  parseISO(item.start),
                  minDate
                );
                const spanDays =
                  differenceInDays(parseISO(item.end), parseISO(item.start)) +
                  1;
                return (
                  <div
                    key={item.id}
                    style={{
                      gridColumnStart: startDayIndex + 1,
                      gridColumnEnd: `span ${spanDays}`,
                      gridRowStart: rowIndex + 1,
                    }}
                    className="relative"
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
      </div>
    </div>
  );
};

export default Timeline;
