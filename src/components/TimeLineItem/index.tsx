import { useDrag } from "react-dnd";
import { formatDate } from "../../lib/utils";
import { TimelineItemData } from "../TimeLine";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const TimelineItem = ({ item }: { item: TimelineItemData }) => {
  const [, drag] = useDrag(() => ({
    type: "timeline-item",
    item,
  }));

  return (
    <div
      ref={drag}
      className="flex flex-col gap-1 py-3 px-8 items-center justify-center bg-slate-200 shadow-lg rounded-lg cursor-grab  box-border whitespace-nowrap text-ellipsis overflow-hidden"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <strong className="inline-block max-w-full overflow-hidden text-ellipsis text-slate-600">
              {item.name}
            </strong>
            <div className="flex flex-wrap gap-1">
              <p> {formatDate(item.start)}</p>{" "}
              <p className="text-center m-auto">-</p>{" "}
              <p>{formatDate(item.end)}</p>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-slate-400 shadow-lg">
            <div>
              <p className="text-ellipsis text-slate-200 font-bold">
                {" "}
                {item.name}{" "}
              </p>
              <div className="flex flex-wrap gap-1 text-slate-300">
                <p> {formatDate(item.start)} </p>
                <p> {formatDate(item.end)} </p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TimelineItem;
