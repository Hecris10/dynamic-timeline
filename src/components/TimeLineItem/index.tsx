import React, { useState } from "react";
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

  const [isEditing, setIsEditing] = useState(false);

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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {isEditing ? (
              <form onSubmit={handleSave} className="flex flex-col gap-2">
                <input
                  type="text"
                  name="name"
                  defaultValue={item.name}
                  className="border p-1"
                  autoFocus
                />
                <div className="flex gap-2">
                  <input
                    type="date"
                    name="startDate"
                    defaultValue={item.start}
                    className="border p-1"
                  />
                  <input
                    type="date"
                    name="endDate"
                    defaultValue={item.end}
                    className="border p-1"
                  />
                </div>
                <button type="submit" className="hidden">
                  Save
                </button>
              </form>
            ) : (
              <>
                <strong className="inline-block max-w-full overflow-hidden text-ellipsis text-slate-600">
                  {item.name}
                </strong>
                <div className="flex flex-wrap gap-2">
                  <p className="m-auto text-center">
                    {" "}
                    {formatDate(item.start)}
                  </p>{" "}
                  <p className="m-auto text-center">{formatDate(item.end)}</p>
                </div>
              </>
            )}
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
