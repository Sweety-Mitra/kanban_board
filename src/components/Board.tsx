import Column from "./Column";
import TaskCard from "./TaskCard";
import type { Task } from "../types/task";
import { useState, useEffect } from "react";
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
    // Load tasks from localStorage (if available)
    const [tasks, setTasks] = useState<Task[]>(() => {
        const storedTasks = localStorage.getItem("tasks");

        try {
            return storedTasks ? JSON.parse(storedTasks) : initialTasks;
        } catch {
            return initialTasks;
        }
    });

    // Number of tasks to show per column
    const [visibleCount, setVisibleCount] = useState(5);

    // Filter + limit tasks
    const todoTasks = tasks
        .filter(task => task.status === "todo")
        .slice(0, visibleCount);

    const inProgressTasks = tasks
        .filter(task => task.status === "in-progress")
        .slice(0, visibleCount);

    const completedTasks = tasks
        .filter(task => task.status === "completed")
        .slice(0, visibleCount);

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

    // Handle drop event
    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        // If dropped outside any column
        if (!over) return;

        const taskId = active.id;        // dragged task
        const newStatus = over.id;       // target column

        // Update task status
        setTasks(prev =>
            prev.map(task =>
                task.id === taskId
                    ? {
                        ...task,
                        status: newStatus,
                        updatedAt: new Date().toISOString(),
                    }
                    : task
            )
        );
    };

    // Load more tasks when reaching bottom
    // Load more tasks safely
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

        const isBottom = scrollTop + clientHeight >= scrollHeight - 5;

        if (isBottom) {
            setVisibleCount(prev => {
                // total tasks count
                const totalTasks = tasks.length;

                // prevent exceeding total tasks
                if (prev >= totalTasks) return prev;

                return prev + 5;
            });
        }
    };

    // Save tasks whenever state changes
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div
            onScroll={handleScroll} // detect scroll 
            style={{ padding: "20px" }}>
            <AddTask onAdd={handleAddTask} />

            {/* DnD Wrapper */}
            <DndContext onDragEnd={handleDragEnd}>
                <div style={{ display: "flex", gap: "20px" }}>
                    <Column title="Todo" status="todo">
                        {todoTasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onUpdate={handleUpdateTask}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </Column>

                    <Column title="In Progress" status="in-progress">
                        {inProgressTasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onUpdate={handleUpdateTask}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </Column>

                    <Column title="Completed" status="completed">
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