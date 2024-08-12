import { useCustomDragLayer } from "./hooks/useCustomDragLayer";
import { CustomDragLayerProps } from "./types";

const CustomDragLayer = ({ minDate, rows }: CustomDragLayerProps) => {
  const { startDayIndex, spanDays, rowIndex, isDragging, currentOffset, item } =
    useCustomDragLayer({ minDate, rows });

  if (!isDragging || !currentOffset || !item) {
    return null;
  }

  return (
    <div
      className="bg-[#007bff4d] border-2 border-dashed border-[#007bff] rounded-lg"
      style={{
        gridColumnStart: startDayIndex + 1,
        gridColumnEnd: `span ${spanDays}`,
        gridRowStart: rowIndex + 1,
        pointerEvents: "none", // Ensure it doesn't interfere with dragging
      }}
    />
  );
};

export default CustomDragLayer;
