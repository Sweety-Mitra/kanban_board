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
            // cleaner column styling
            style={{
                flex: 1,
                padding: "15px",
                borderRadius: "10px",
                minHeight: "350px",
                backgroundColor: isOver ? "#e6f7ff" : "#f4f5f7", // subtle color
            }}
        >
            <h2 style={{ marginBottom: "10px" }}>{title}</h2>
            {/* Show message if no tasks */}
            {Array.isArray(children) && children.length === 0 && (
                <p style={{ color: "#888" }}>No tasks</p>
            )}
            {children}
        </div>
    );
};

export default Column;