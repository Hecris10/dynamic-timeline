import clsx, { ClassValue } from "clsx";
import {
  addDays,
  differenceInDays,
  endOfMonth,
  format,
  startOfMonth,
} from "date-fns";
import { twMerge } from "tailwind-merge";
import { NewTimelineItem, TimelineItemData } from "../components/TimeLine";

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
export const arrangeEventsInLanes = (events: TimelineItemData[]) => {
  console.log({ events });
  const lanes: TimelineItemData[][] = [];
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
  events: TimelineItemData[],
  newEvent: TimelineItemData | NewTimelineItem
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

export function generateId(events: TimelineItemData[]): number {
  const newId = events.length + 1;
  const isIdNotUnique = events.some((event) => event.id === newId);
  return isIdNotUnique ? generateId(events) : newId;
}

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getMonthHeaders = (minDate: Date, totalDays: number) => {
  const headers = [];
  let currentDate = minDate;
  while (differenceInDays(currentDate, addDays(minDate, totalDays)) < 0) {
    const startOfCurrentMonth = startOfMonth(currentDate);
    const endOfCurrentMonth = endOfMonth(currentDate);
    const startDayIndex = differenceInDays(startOfCurrentMonth, minDate);
    headers.push({
      startDayIndex,
      monthYear: format(startOfCurrentMonth, "MMMM yyyy"),
    });
    currentDate = addDays(endOfCurrentMonth, 1);
  }
  return headers;
};
