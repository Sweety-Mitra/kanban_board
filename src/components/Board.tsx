import Column from "./Column";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import type { Task } from "../types/task";
import { useState, useEffect } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

// initial tasks
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Learn React",
    description: "Hooks and state",
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Board = () => {
  // load from localStorage safely
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    try {
      return stored ? JSON.parse(stored) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  // pagination count
  const [visibleCount, setVisibleCount] = useState(5);

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // filter tasks
  const todoTasks = tasks
    .filter(t => t.status === "todo")
    .slice(0, visibleCount);

  const inProgressTasks = tasks
    .filter(t => t.status === "in-progress")
    .slice(0, visibleCount);

  const completedTasks = tasks
    .filter(t => t.status === "completed")
    .slice(0, visibleCount);

  // add task
  const handleAddTask = (title: string) => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description: "",
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks(prev => [newTask, ...prev]);
  };

  // update task
  const handleUpdateTask = (id: string, title: string, desc: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              title,
              description: desc,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  // change status (buttons)
  const handleStatusChange = (id: string, status: Task["status"]) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              status,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  // drag drop logic
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    // prevent unnecessary update
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

  // infinite scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setVisibleCount(prev =>
        prev >= tasks.length ? prev : prev + 5
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <AddTask onAdd={handleAddTask} />

      <DndContext onDragEnd={handleDragEnd}>
        <div
          className="board"
          onScroll={handleScroll}
          style={{
            display: "flex",
            gap: "20px",
            height: "400px",
            overflowY: "auto",
          }}
        >
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