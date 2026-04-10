import Column from "./Column";

const Board = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
      }}
    >
      <Column title="Todo" />
      <Column title="In Progress" />
      <Column title="Completed" />
    </div>
  );
};

export default Board;