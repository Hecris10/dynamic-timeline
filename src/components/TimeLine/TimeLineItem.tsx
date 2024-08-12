import { HiDotsVertical, HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

import { cn, formatDate } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useTimeLineItem } from "./hooks/useTTimeLineItem";
import { TimelineItemProps } from "./types";

const TimelineItem = ({ item, updateItem, deleteItem }: TimelineItemProps) => {
  const {
    drag,
    inputNameRef,
    isEditing,
    bgColor,
    handleEditClick,
    handleDelete,
    handleSave,
  } = useTimeLineItem({ item, updateItem, deleteItem });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex flex-col w-full h-full">
          <div
            ref={drag}
            style={{ backgroundColor: bgColor }}
            className={cn(
              "w-full h-full inset-0 flex items-center justify-center p-4 px-2 overflow-hidden rounded-lg shadow-lg relative text-ellipsis whitespace-nowrap event-card"
            )}
          >
            <div className="absolute opacity-0 top-2 right-2 event-drop-down">
              <DropdownMenu>
                <DropdownMenuTrigger autoFocus={false}>
                  <button type="button" autoFocus={false}>
                    <HiDotsVertical />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2" onClick={handleEditClick}>
                    <HiPencil className="w-5 h-5" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2" onClick={handleDelete}>
                    <MdDelete className="w-5 h-5" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {isEditing ? (
              <form
                onSubmit={handleSave}
                className="flex flex-col w-full h-full gap-2"
              >
                <Input
                  ref={inputNameRef}
                  type="text"
                  name="name"
                  defaultValue={item.name}
                  autoFocus
                  className="p-0 font-bold text-center border text-slate-600 bg-slate-200"
                />
                <div className="flex gap-2">
                  <Input
                    type="date"
                    name="startDate"
                    defaultValue={item.start}
                    className="p-0 font-bold text-center border text-slate-600 bg-slate-200"
                  />
                  <Input
                    type="date"
                    name="endDate"
                    defaultValue={item.end}
                    className="p-0 font-bold text-center border text-slate-600 bg-slate-200"
                  />
                </div>
                <button type="submit" className="hidden">
                  Save
                </button>
              </form>
            ) : (
              <div className="flex flex-col w-full h-full">
                <strong className="inline-block max-w-full mx-auto overflow-hidden text-xl text-center text-ellipsis ">
                  {item.name}
                </strong>
                <div className="flex flex-wrap gap-2 text-lg">
                  <p className="m-auto text-center">
                    {" "}
                    {formatDate(item.start)}
                  </p>{" "}
                  <p className="m-auto text-center">{formatDate(item.end)}</p>
                </div>
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="shadow-lg bg-slate-100">
          <div>
            <p className="font-bold text-black text-ellipsis"> {item.name} </p>
            <div className="flex flex-wrap gap-1 text-slate-700">
              <p> {formatDate(item.start)} </p>
              <p className="m-auto text-center">-</p>{" "}
              <p> {formatDate(item.end)} </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TimelineItem;
