import NewEventModal from "../Modals/NewEventModal";
import { NewTimelineItem } from "../TimeLine";

export const TimeLineHeader = ({
  onSave,
}: {
  onSave: (event: NewTimelineItem) => void;
}) => {
  return (
    <div className="flex items-center justify-between px-8 py-3">
      <h1 className="font-bold text-2xl">Dynamic Timeline</h1>
      <NewEventModal onSave={onSave} />
    </div>
  );
};
