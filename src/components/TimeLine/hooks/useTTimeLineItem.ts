import { useEffect, useMemo, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { getRandomColor } from "../../../lib/utils";
import { TimelineItemProps } from "../types";

export const useTimeLineItem = ({
  item,
  updateItem,
  deleteItem,
}: TimelineItemProps) => {
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

  return {
    drag,
    inputNameRef,
    isEditing,
    bgColor,
    handleEditClick,
    handleDelete,
    handleSave,
  };
};
