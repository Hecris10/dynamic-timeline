import { useDrag } from "react-dnd";
import { HiDotsVertical, HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { formatDate } from "../../lib/utils";
import { TimelineItemData } from "../TimeLine";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
      className="flex flex-col gap-1 py-3 px-8 items-center relative justify-center bg-slate-200 shadow-lg rounded-lg cursor-grab  box-border whitespace-nowrap text-ellipsis overflow-hidden"
    >
      <div className="absolute top-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button>
              <HiDotsVertical />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <HiPencil className="w-5 h-5" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <MdDelete className="w-5 h-5" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <strong className="inline-block max-w-full overflow-hidden text-ellipsis text-slate-600">
              {item.name}
            </strong>
            <div className="flex flex-wrap gap-2">
              <p className="m-auto text-center"> {formatDate(item.start)}</p>{" "}
              <p className="m-auto text-center">{formatDate(item.end)}</p>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-slate-100 shadow-lg">
            <div>
              <p className="text-ellipsis text-black font-bold">
                {" "}
                {item.name}{" "}
              </p>
              <div className="flex flex-wrap gap-1 text-slate-700">
                <p> {formatDate(item.start)} </p>
                <p className="text-center m-auto">-</p>{" "}
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
