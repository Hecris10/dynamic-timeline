import { parseISO } from "date-fns";
import React from "react";
import { useDrop } from "react-dnd";
import TimelineItem from "../TimeLineItem";
import "./Timeline.css";

interface TimelineItemData {
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
      const newStart = draggedItem.start; // Logic to calculate new start based on delta
      const newEnd = draggedItem.end; // Logic to calculate new end based on delta
      onDrop(draggedItem, newStart, newEnd);
    },
  }));

  // Logic to arrange items in lanes
  const lanes: TimelineItemData[][] = [[]];

  items.forEach((item) => {
    let placed = false;
    for (const lane of lanes) {
      if (
        lane.length === 0 ||
        parseISO(lane[lane.length - 1].end) < parseISO(item.start)
      ) {
        lane.push(item);
        placed = true;
        break;
      }
    }
    if (!placed) {
      lanes.push([item]);
    }
  });

  return (
    <div ref={drop} className="timeline">
      {lanes.map((lane, laneIndex) => (
        <div key={laneIndex} className="timeline-lane">
          {lane.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
