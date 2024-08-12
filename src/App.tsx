import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Timeline from "./components/TimeLine";
import timeLineItems from "./timelineItems";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Timeline events={timeLineItems} />
      </div>
    </DndProvider>
  );
}

export default App;
