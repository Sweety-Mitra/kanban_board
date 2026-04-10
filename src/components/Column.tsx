import type { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

type ColumnProps = {
  title: string;
  status: "todo" | "in-progress" | "completed"; // identify column
  children?: ReactNode;
};

const Column = ({ title, status, children }: ColumnProps) => {
  // Make column droppable
  const { setNodeRef, isOver } = useDroppable({
    id: status, // important: unique drop id
  });

  return (
    <div
      ref={setNodeRef} // connect drop zone
      style={{
        flex: 1,
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        minHeight: "300px",
        backgroundColor: isOver ? "#e6f7ff" : "#f9f9f9", // highlight on hover
      }}
    >
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Column;