import Column from "./Column";
import TaskCard from "./TaskCard";
import type { Task } from "../types/task";
import { useState } from "react";
import AddTask from "./AddTask";

// Initial dummy tasks
const initialTasks: Task[] = [
    {
        id: "1",
        title: "Learn React",
        description: "Hooks and state",
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "2",
        title: "Kanban Project",
        description: "Assignment work",
        status: "in-progress",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "3",
        title: "Setup Project",
        status: "completed",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const Board = () => {
    // Store all tasks in state
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    // Filter tasks based on status
    const todoTasks = tasks.filter(task => task.status === "todo");
    const inProgressTasks = tasks.filter(task => task.status === "in-progress");
    const completedTasks = tasks.filter(task => task.status === "completed");

    // Add new task
    const handleAddTask = (title: string) => {
        const newTask: Task = {
            id: Date.now().toString(), // unique id
            title,
            description: "",
            status: "todo", // default column
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Add new task at top
        setTasks(prev => [newTask, ...prev]);
    };

    // Update task title
    const handleUpdateTask = (id: string, updatedTitle: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? {
                        ...task,
                        title: updatedTitle,
                        updatedAt: new Date().toISOString(), // update timestamp
                    }
                    : task
            )
        );
    };

    return (
        <div style={{ padding: "20px" }}>
            {/* Add Task Input */}
            <AddTask onAdd={handleAddTask} />

            <div style={{ display: "flex", gap: "20px" }}>
                {/* Todo Column */}
                <Column title="Todo">
                    {todoTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onUpdate={handleUpdateTask}
                        />
                    ))}
                </Column>

                {/* In Progress Column */}
                <Column title="In Progress">
                    {inProgressTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onUpdate={handleUpdateTask}
                        />
                    ))}
                </Column>

                {/* Completed Column */}
                <Column title="Completed">
                    {completedTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onUpdate={handleUpdateTask}
                        />
                    ))}
                </Column>
            </div>
        </div>
    );
};

export default Board;