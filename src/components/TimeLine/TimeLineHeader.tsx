import NewEventModal from "./NewEventModal";
import { NewTimelineItem } from "./types";

export const TimeLineHeader = ({
  onSave,
}: {
  onSave: (event: NewTimelineItem) => void;
}) => {
  return (
    <div className="flex items-center justify-between px-8 py-3 shadow-2xl bg-zinc-400">
      <h1 className="text-2xl font-bold">Dynamic Timeline</h1>
      <NewEventModal onSave={onSave} />
    </div>
  );
};
