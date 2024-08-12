import { useDrag } from "react-dnd";
import { formatDate } from "../../lib/utils";
import { TimelineItemData } from "../TimeLine";

const TimelineItem = ({ item }: { item: TimelineItemData }) => {
  const [, drag] = useDrag(() => ({
    type: "timeline-item",
    item,
  }));

  return (
    <div
      ref={drag}
      className="flex flex-col gap-1 items-center justify-center bg-slate-300 shadow-lg rounded-lg cursor-grab p-3 box-border whitespace-nowrap text-ellipsis overflow-hidden"
    >
      <strong className="inline-block max-w-full overflow-hidden text-ellipsis">
        {item.name}
      </strong>
      <div className="flex flex-wrap gap-1">
        <p> {formatDate(item.start)}</p> <p className="text-center m-auto">-</p>{" "}
        <p>{formatDate(item.end)}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
