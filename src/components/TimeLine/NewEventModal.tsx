import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useNewEventModal } from "./hooks/useNewEventModal";
import { NewEventModalProps } from "./types";

export default function NewEventModal({ onSave }: NewEventModalProps) {
  const { open, onOpenChange, handleSave } = useNewEventModal(onSave);

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
