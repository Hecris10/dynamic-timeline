export type NewTimeLineEvent = { name: string; start: string; end: string };

export type TimeLineEvent = NewTimeLineEvent & { id: number };
