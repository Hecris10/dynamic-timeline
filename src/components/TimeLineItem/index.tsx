import { useDrag } from "react-dnd";
import { TimelineItemData } from "../TimeLine";

const TimelineItem = ({ item }: { item: TimelineItemData }) => {
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
