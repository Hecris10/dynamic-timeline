import React from "react";
import { useDrag } from "react-dnd";

interface TimelineItemProps {
  item: {
    id: number;
    start: string;
    end: string;
    name: string;
  };
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item }) => {
  const [, drag] = useDrag(() => ({
    type: "timeline-item",
    item,
  }));

  return (
    <div
      ref={drag}
      className="flex items-center justify-center bg-slate-300 shadow-lg rounded-lg cursor-grab p-3 box-border whitespace-nowrap text-ellipsis"
    >
      <strong>{item.name}</strong>
      <div>
        {item.start} - {item.end}
      </div>
    </div>
  );
};

export default TimelineItem;
