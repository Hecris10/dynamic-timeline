import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { HiDotsVertical, HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { cn, formatDate, getRandomColor } from "../../lib/utils";
import { TimelineItemData } from "../TimeLine";
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

interface TimelineItemProps {
  item: TimelineItemData;

  updateItem: (updatedItem: TimelineItemData) => void;
  deleteItem: (deletedItem: TimelineItemData) => void;
}

const TimelineItem = ({ item, updateItem, deleteItem }: TimelineItemProps) => {
  const [, drag] = useDrag(() => ({
    type: "timeline-item",
    item,
  }));
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const bgColor = useMemo(() => getRandomColor(), []);
  useEffect(() => {
    if (isEditing) {
      setTimeout(() => {
        inputNameRef.current?.focus();
      }, 2000);
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    deleteItem(item);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const startDate = (form.elements.namedItem("startDate") as HTMLInputElement)
      .value;
    const endDate = (form.elements.namedItem("endDate") as HTMLInputElement)
      .value;

    setIsEditing(false);
    console.log({ name, startDate, endDate });
    updateItem({
      ...item,
      name,
      start: new Date(startDate).toISOString(),
      end: new Date(endDate).toISOString(),
    });
  };

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
