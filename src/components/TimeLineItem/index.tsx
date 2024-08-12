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
    <div ref={drag} className="timeline-item">
      <strong>{item.name}</strong>
      <div>
        {item.start} - {item.end}
      </div>
    </div>
  );
};

export default TimelineItem;
