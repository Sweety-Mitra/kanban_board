import Column from "./Column"
import TaskCard from "./TaskCard";

const Board = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
      }}
    >
      <Column title="Todo">
        <TaskCard title="Learn React" description="Hooks and state" />
        <TaskCard title="Build UI" />
      </Column>

      <Column title="In Progress">
        <TaskCard title="Kanban Project" description="Assignment work" />
      </Column>

      <Column title="Completed">
        <TaskCard title="Setup Project" />
      </Column>
    </div>
  );
};

export default Board;