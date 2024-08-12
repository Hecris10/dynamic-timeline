import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  NewTimeLineEvent,
  TimeLineEvent,
} from "../components/TimeLineEvent/TimeLineEvent.types";

// Helper function to convert date to days since a reference date
export const dateToDays = (date: string) => {
  const referenceDate = new Date("2021-01-01").getTime();
  const currentDate = new Date(date).getTime();
  return Math.floor((currentDate - referenceDate) / (1000 * 60 * 60 * 24));
};

export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

// Helper function to arrange events in lanes
export const arrangeEventsInLanes = (events: TimeLineEvent[]) => {
  console.log({ events });
  const lanes: TimeLineEvent[][] = [];
  events?.forEach((event) => {
    const start = event.start;
    const end = event.end;
    let placed = false;
    for (const lane of lanes) {
      if (lane.every((e) => e.end < start || e.start > end)) {
        lane.push(event);
        placed = true;
        break;
      }
    }
    if (!placed) {
      lanes.push([event]);
    }
  });

  return lanes;
};
// Helper function to check if an event is a duplicate
export const isEventDuplicate = (
  events: TimeLineEvent[],
  newEvent: TimeLineEvent | NewTimeLineEvent
) => {
  return events.some(
    (event) =>
      event.start === newEvent.start &&
      event.end === newEvent.end &&
      event.name === newEvent.name
  );
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(events: TimeLineEvent[]): number {
  const newId = events.length + 1;
  const isIdNotUnique = events.some((event) => event.id === newId);
  return isIdNotUnique ? generateId(events) : newId;
}
