import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../types/task";

type TaskCardProps = {
  task: Task;
  onUpdate: (id: string, updatedTitle: string, updatedDesc: string) => void;
  onStatusChange: (id: string, newStatus: Task["status"]) => void;
};

const TaskCard = ({ task, onUpdate, onStatusChange }: TaskCardProps) => {
  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  // Make draggable
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  // Apply drag movement style
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  // Save updated task
  const handleSave = () => {
    if (!title.trim()) return;

    onUpdate(task.id, title, description);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef} // connect drag
      style={{
        ...style,
        background: "#fff",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "6px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        cursor: "grab",
      }}
      {...listeners}   // drag events
      {...attributes}  // accessibility
    >
      {isEditing ? (
        <>
          {/* Edit title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", marginBottom: "5px" }}
          />

          {/* Edit description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", marginBottom: "5px" }}
          />

          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          {/* Display mode */}
          <h4>{task.title}</h4>
          {task.description && <p>{task.description}</p>}

          {/* Edit button */}
          <button onClick={() => setIsEditing(true)}>Edit</button>

          {/* Move buttons */}
          <div style={{ marginTop: "5px" }}>
            {task.status !== "todo" && (
              <button onClick={() => onStatusChange(task.id, "todo")}>
                Todo
              </button>
            )}

            {task.status !== "in-progress" && (
              <button onClick={() => onStatusChange(task.id, "in-progress")}>
                In Progress
              </button>
            )}

            {task.status !== "completed" && (
              <button onClick={() => onStatusChange(task.id, "completed")}>
                Completed
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;