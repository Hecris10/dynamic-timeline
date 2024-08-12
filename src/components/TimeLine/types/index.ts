export interface TimelineItemData {
  id: number;
  start: string;
  end: string;
  name: string;
}

export interface NewTimelineItem {
  name: string;
  start: string;
  end: string;
}

export interface TimelineProps {
  events: TimelineItemData[];
}

export interface TimelineItemProps {
  item: TimelineItemData;

  updateItem: (updatedItem: TimelineItemData) => void;
  deleteItem: (deletedItem: TimelineItemData) => void;
}

export interface TimelineItemData {
  id: number;
  start: string;
  end: string;
  name: string;
}

export interface CustomDragLayerProps {
  minDate: Date;
  rows: TimelineItemData[][];
}

export interface NewEventModalProps {
  onSave: (event: NewTimelineItem) => void;
}
