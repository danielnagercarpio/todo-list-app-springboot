package com.dozom.todolist.controller;

import com.dozom.todolist.model.TodoItem;
import com.dozom.todolist.repo.TodoRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/todo")
public class TodoController {

    @Autowired
    private TodoRepo todoRepo;

    @GetMapping
    public List<TodoItem> findAll() {
        return todoRepo.findAll();
    }

    @PostMapping
    public TodoItem save(@Valid @RequestBody TodoItem todoItem){
        return todoRepo.save(todoItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoItem> update(@PathVariable Long id, @Valid @RequestBody TodoItem todoItem) {
        Optional<TodoItem> existingTodo = todoRepo.findById(id);
        if (!existingTodo.isPresent()) {
            return ResponseEntity.notFound().build();  // 404 si no existe
        }
        todoItem.setId(id);
        TodoItem updatedTodo = todoRepo.save(todoItem);
        return ResponseEntity.ok(updatedTodo);     }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if (!todoRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        todoRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
