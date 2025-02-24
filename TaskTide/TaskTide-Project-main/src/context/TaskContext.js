import React, { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Add a new task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Remove a task
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Toggle task completion
  const toggleTaskCompletion = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Update an existing task
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.title === updatedTask.title ? updatedTask : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        toggleTaskCompletion,
        updateTask, // Provide updateTask in context
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
