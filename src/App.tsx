import "./App.css";
import TimeLine from "./components/TimeLine";
import items from "./timelineItems";

function App() {
  return <TimeLine events={items} />;
}

export default App;
