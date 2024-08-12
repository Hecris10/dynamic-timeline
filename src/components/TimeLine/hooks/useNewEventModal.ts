import { FormEvent, useState } from "react";
import { NewTimelineItem } from "../types";

export const useNewEventModal = (onSave: (event: NewTimelineItem) => void) => {
  const [open, setOpen] = useState(false);

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onSave({
      name: formData.get("name") as string,
      start: formData.get("start") as string,
      end: formData.get("end") as string,
    });
    setOpen(false);
  };

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return {
    open,
    onOpenChange,
    handleSave,
  };
};
