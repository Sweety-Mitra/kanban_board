import { useState } from "react";
import type { Task } from "../types/task";

type TaskCardProps = {
  task: Task;
  onUpdate: (id: string, updatedTitle: string) => void;
};

const TaskCard = ({ task, onUpdate }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  // Save updated title
  const handleSave = () => {
    if (!title.trim()) return;

    onUpdate(task.id, title);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "6px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {isEditing ? (
        <>
          {/* Edit input */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", marginBottom: "5px" }}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          {/* Display mode */}
          <h4>{task.title}</h4>
          {task.description && <p>{task.description}</p>}
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default TaskCard;