import Column from "./Column";
import TaskCard from "./TaskCard";
import type { Task } from "../types/task";
import { useState } from "react";
import AddTask from "./AddTask";
import { DndContext } from "@dnd-kit/core";

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
    const handleUpdateTask = (
        id: string,
        updatedTitle: string,
        updatedDesc: string
    ) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? {
                        ...task,
                        title: updatedTitle,
                        description: updatedDesc,
                        updatedAt: new Date().toISOString(),
                    }
                    : task
            )
        );
    };

    // Change task status
    const handleStatusChange = (
        id: string,
        newStatus: Task["status"]
    ) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? {
                        ...task,
                        status: newStatus,
                        updatedAt: new Date().toISOString(),
                    }
                    : task
            )
        );
    };

    return (
  <div style={{ padding: "20px" }}>
    <AddTask onAdd={handleAddTask} />

    {/* DnD Wrapper */}
    <DndContext>
      <div style={{ display: "flex", gap: "20px" }}>
        <Column title="Todo">
          {todoTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={handleUpdateTask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </Column>

        <Column title="In Progress">
          {inProgressTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={handleUpdateTask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </Column>

        <Column title="Completed">
          {completedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={handleUpdateTask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </Column>
      </div>
    </DndContext>
  </div>
);
};

export default Board;