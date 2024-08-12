# Timeline Component

This project is a timeline component built with React and TypeScript. The timeline layout arranges events in a compact, space-efficient way. If event A ends before event B starts, the bars for those events can share the same horizontal lane. This constraint is slightly relaxed to fit the name of the event if necessary.

## Features

- **Compact Layout**: Events are arranged to share lanes when possible.
- **Zooming**: Allows zooming in and out of the timeline.
- **Drag and Drop**: Change the start date and/or end date for an event by dragging and dropping.
- **Inline Editing**: Edit the name of events directly on the timeline.
- **Event Management**: Create, edit, and delete events.

## Input Format

The input to the component is an array of events, where each event has:

- `name`: The name of the event.
- `start`: The start date in `YYYY-MM-DD` format.
- `end`: The end date in `YYYY-MM-DD` format.

Example:

```json
[
  {
    "name": "Event 1",
    "start": "2021-12-23",
    "end": "2021-12-25"
  },
  {
    "name": "Event 2",
    "start": "2021-12-26",
    "end": "2021-12-28"
  }
]
```

## How to Build and Run

### 1. Clone the repository:

```console
git clone https://github.com/Hecris10/dynamic-timeline.git
cd dynamic-timeline
```

### 2. Install dependencies:

```console
npm install
```

### 3. Run the project::

```console
npm run dev
```

### 4. Open the project in your browser: Navigate to http://localhost:3000 to see the timeline component in action.

## Development Details

### Time Spent

I spent approximately 3.5 hours on this assignment.

### Implementation Highlights

- Compact Layout: Ensures efficient use of space by sharing lanes for non-overlapping events.
- Zooming and Drag-and-Drop: Enhances user interaction with the timeline.
- Inline Editing: Provides a seamless way to update event names.

### Inspiration

I got inspiration in the following projecjs and applications:

- Google maps UX
- Monday CRM
- React Timeline componen libraries
- Reat Suit

### Improvements

- Drag-and-Drop Logic: Needs refinement to handle multiple intersecting events better.
- Styling: Improve colors and general styles for better visual appeal.
- Testing: More comprehensive tests for event creation and editing.
- Design Decisions
- Libraries: Used React for the component structure, React Drag and Drop for drag-and-drop functionality, Lucide Icons for icons, and TailwindCSS for styling.

### Testing

If I had more time, I would:

- Write unit tests for all components.
- Implement end-to-end tests to ensure the timeline behaves correctly with various inputs.
- Test edge cases, such as overlapping events and events with long names.
- Sample Data
- To see the timeline component in action, you can use the sample data included in src/timelineItems.js.

Conclusion
This project demonstrates a compact and interactive timeline component with essential features like zooming, drag-and-drop, and inline editing. While there are areas for improvement, the current implementation provides a solid foundation for further development and enhancement.

Feel free to reach out if you have any questions or need further assistance. Happy coding! ```
