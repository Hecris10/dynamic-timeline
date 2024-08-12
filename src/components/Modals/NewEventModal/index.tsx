import { FormEvent, useState } from "react";
import { NewTimeLineEvent } from "../../TimeLineEvent/TimeLineEvent.types";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

export default function NewEventModal({
  onSave,
}: {
  onSave: (event: NewTimeLineEvent) => void;
}) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>New event</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New event</DialogTitle>
          <DialogDescription>
            Create a new event to add to the timeline.
          </DialogDescription>
        </DialogHeader>
        {open && (
          <form onSubmit={handleSave}>
            <Label>Name:</Label>
            <Input className="mb-2" required type="text" name="name" />
            <Label>Start Date:</Label>
            <Input className="mb-2" required type="date" name="start" />
            <Label>End Date:</Label>
            <Input className="mb-2" required type="date" name="end" />

            <DialogFooter className="mt-8">
              <Button className="w-full" type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
