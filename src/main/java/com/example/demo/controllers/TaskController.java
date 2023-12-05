package com.example.demo.controllers;

import com.example.demo.models.Task;
import com.example.demo.repositories.taskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final taskRepository taskRepository;

    @Autowired
    public TaskController(taskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/")
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping("/")
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
    // Find the existing task by id from the repository
    Task existingTask = taskRepository.findById(id).orElse(null);

    // If the task with the given id exists
    if (existingTask != null) {
        // Update the existing task with the values from the updated task
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setCompleted(updatedTask.isCompleted());

        // Save the updated task in the repository and return the updated task
        return taskRepository.save(existingTask);
    }

    // If the task with the given id doesn't exist, return null
    return null;
}

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}

    
/*
    @GetMapping("/hello")
    public String hello() {
        return "Hello, world!";
    }

    @GetMapping("/greet/{name}")
    public String greet(@PathVariable String name) {
        return "Hello, " + name + "!";
    }
     */