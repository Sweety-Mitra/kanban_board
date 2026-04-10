import { useState } from "react";

type AddTaskProps = {
    onAdd: (title: string) => void;
};

const AddTask = ({ onAdd }: AddTaskProps) => {
    const [title, setTitle] = useState("");

    const handleAdd = () => {
        if (!title.trim()) return;

        onAdd(title);
        setTitle("");
    };

    return (
        <div style={{ marginBottom: "20px" }}>
            <input
                type="text"
                placeholder="Enter task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ padding: "8px", width: "70%", marginRight: "10px" }}
            />
            <button onClick={handleAdd}>Add</button>
        </div>
    );
};

export default AddTask;