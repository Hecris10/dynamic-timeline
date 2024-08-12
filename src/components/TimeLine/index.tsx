import { addDays, differenceInDays, parseISO } from "date-fns";
import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import CustomDragLayer from "./CustomDragLayer";
import { useTimeLine } from "./hooks/useTimeLine";
import { TimeLineHeader } from "./TimeLineHeader";
import TimelineItem from "./TimeLineItem";
import { TimelineItemData } from "./types";

const Timeline = ({ events }: { events: TimelineItemData[] }) => {
  const {
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
    zoom,
  } = useTimeLine(events);

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

          <CustomDragLayer minDate={minDate} rows={rows} />
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
