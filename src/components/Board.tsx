import Column from "./Column"
import TaskCard from "./TaskCard";
import type { Task } from "./types/task";
import { useState } from "react";

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
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const todoTasks = tasks.filter(task => task.status === "todo");
    const inProgressTasks = tasks.filter(task => task.status === "in-progress");
    const completedTasks = tasks.filter(task => task.status === "completed");
    return (
        <div
            style={{
                display: "flex",
                gap: "20px",
                padding: "20px",
            }}
        >
            <Column title="Todo">
                {todoTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        description={task.description}
                    />
                ))}
            </Column>

            <Column title="In Progress">
                {inProgressTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        description={task.description}
                    />
                ))}
            </Column>

            <Column title="Completed">
                {completedTasks.map(task => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        description={task.description}
                    />
                ))}
            </Column>
        </div>
    );
};

export default Board;