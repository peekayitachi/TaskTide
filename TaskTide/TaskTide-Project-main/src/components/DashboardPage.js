import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Add, Delete, CheckCircleOutline } from "@mui/icons-material";

const DashboardPage = () => {
  const { tasks, addTask, removeTask, toggleTaskCompletion, updateTask } =
    useTasks();
  const [newItem, setNewItem] = useState("");
  const [activeTab, setActiveTab] = useState(0); // 0: To-Do, 1: Journal
  const [selectedItem, setSelectedItem] = useState(null); // Tracks the selected item

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      const newTask = {
        title: newItem,
        content: "",
        completed: false,
        type: activeTab === 0 ? "todo" : "journal",
      };
      addTask(newTask);
      setNewItem("");
    }
  };

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
    setSelectedItem(null); // Clear selection when switching tabs
  };

  const handleSelectItem = (task) => {
    setSelectedItem(task);
  };

  const handleUpdateContent = (updatedContent) => {
    if (selectedItem) {
      const updatedTask = { ...selectedItem, content: updatedContent };
      updateTask(updatedTask); // Update the task in context
      setSelectedItem(updatedTask); // Update local state
    }
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#121212" color="white">
      {/* Sidebar */}
      <Box
        width="25%"
        bgcolor="#1E1E1E"
        padding={2}
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h4" sx={{ marginBottom: 2, color: "#FFF" }}>
          TaskTide
        </Typography>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="inherit"
        >
          <Tab label="To-Do List" />
          <Tab label="Journal/Notes" />
        </Tabs>
        <TextField
          label={
            activeTab === 0 ? "Add a new task" : "Add a new journal entry"
          }
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          variant="filled"
          size="small"
          sx={{ marginY: 2 }}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "gray" } }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddItem}
        >
          Add
        </Button>
        <List sx={{ marginTop: 2 }}>
          {tasks
            .filter((task) =>
              activeTab === 0 ? task.type === "todo" : task.type === "journal"
            )
            .map((task, index) => (
              <ListItem
                key={index}
                sx={{
                  bgcolor: selectedItem === task ? "#3E3E3E" : "#2E2E2E",
                  marginBottom: 1,
                  borderRadius: "5px",
                }}
                button
                onClick={() => handleSelectItem(task)}
              >
                <ListItemText
                  primary={task.title}
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: "#FFF",
                  }}
                />
                {activeTab === 0 && (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTaskCompletion(index);
                    }}
                  >
                    <CheckCircleOutline
                      sx={{
                        color: task.completed ? "green" : "gray",
                      }}
                    />
                  </IconButton>
                )}
                <IconButton
                  edge="end"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTask(index);
                    if (selectedItem === task) setSelectedItem(null);
                  }}
                >
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
        </List>
      </Box>

      {/* Main Area */}
      <Box
        flexGrow={1}
        padding={3}
        sx={{
          backgroundImage: 'url(/images/2.jpg)',
          //backgroundSize: 'cover', // Ensures the image covers the area
          backgroundPosition: 'center', // Centers the image
          height: '100vh', // Optional, adjust based on your layout needs
        }}
        color="white"
      >
        {selectedItem ? (
          <>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              {selectedItem.title}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={10}
              value={selectedItem.content || ""}
              onChange={(e) => handleUpdateContent(e.target.value)}
              variant="outlined"
              sx={{
                bgcolor: "#2E2E2E",
                color: "white",
                borderRadius: "5px",
                "& .MuiInputBase-input": {
                  color: "white",
                },
              }}
            />
          </>
        ) : (
          <Typography variant="h5" color="gray">
            Select a {activeTab === 0 ? "task" : "journal entry"} to view or edit
            its details.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DashboardPage;
