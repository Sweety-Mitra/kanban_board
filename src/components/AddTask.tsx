import { useState } from "react";

type AddTaskProps = {
    onAdd: (title: string, description: string) => void;
};

const AddTask = ({ onAdd }: AddTaskProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAdd = () => {
        if (!title.trim()) return;

        onAdd(title, description);
        setTitle("");
        setDescription("");
    };

    return (
        <div
            style={{
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
            }}
        >
            <input
                type="text"
                placeholder="Enter task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                    padding: "8px",
                    width: "250px",
                    marginRight: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                }}
            />
            <textarea
                placeholder="Enter description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                    padding: "8px",
                    width: "250px",
                    marginRight: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                }}
            />
            <button
                onClick={handleAdd}
                style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                }}
            >
                Add
            </button>
        </div>
    );
};

export default AddTask;