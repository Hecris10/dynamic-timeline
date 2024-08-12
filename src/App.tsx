import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import Timeline from "./components/TimeLine";
import timeLineItems from "./timelineItems";

function App() {
  const [items, setItems] = useState(timeLineItems);

  const handleDrop = (item, newStart, newEnd) => {
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id ? { ...i, start: newStart, end: newEnd } : i
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Timeline items={items} onDrop={handleDrop} />
      </div>
    </DndProvider>
  );
}

export default App;
