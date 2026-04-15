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
                display: "flex",
                flexDirection: "column",
                border: "2px solid #000",
                borderRadius: "10px",
                backgroundColor: isOver ? "#e6f7ff" : "#f4f5f7",
            }}
        >
            <h2 style={{ marginBottom: "10px" }}>{title}</h2>
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    justifyContent: "flex-start",
                }}
            >
            {/* Show message if no tasks */}
            {Array.isArray(children) && children.length === 0 && (
                <p style={{ color: "#888" }}>No tasks</p>
            )}
            {children}
        </div>
        </div>
    );
};

export default Column;