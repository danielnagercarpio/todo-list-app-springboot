package com.dozom.todolist.service;

import com.dozom.todolist.dto.TaskRequest;
import com.dozom.todolist.dto.TaskResponse;
import com.dozom.todolist.model.TodoItem;
import com.dozom.todolist.repo.TodoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoService {

    private final TodoRepo repository;

    @Autowired
    public TodoService(TodoRepo repository) {
        this.repository = repository;
    }

    public List<TaskResponse> findAll() {
        return repository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public TaskResponse save(TaskRequest request) {
        TodoItem todo = new TodoItem();
        todo.setTitle(request.title());
        todo.setDone(request.done());
        TodoItem saved = repository.save(todo);
        return toResponse(saved);
    }
    private TaskResponse toResponse(TodoItem task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.isDone()
        );
    }
}
