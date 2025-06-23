package com.dozom.todolist;

import com.dozom.todolist.controller.TodoController;
import com.dozom.todolist.model.TodoItem;
import com.dozom.todolist.repo.TodoRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(TodoController.class)
class TodoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TodoRepo todoRepo;

    @TestConfiguration
    static class MockConfig {
        @Bean
        public TodoRepo todoRepo() {
            return Mockito.mock(TodoRepo.class);
        }
    }

    @Autowired
    private ObjectMapper objectMapper;

    // TODO: findAll Tests
    @Test
    void testFindAllResponseOkandValidTitle() throws Exception {
        TodoItem todo = new TodoItem(1L, "Estudiar Java", false);
        Mockito.when(todoRepo.findAll()).thenReturn(Arrays.asList(todo));
        mockMvc.perform(get("/todo"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Estudiar Java"))
                .andExpect(jsonPath("$[0].done").value(false));

    }
    @Test
    void testFindAllResponseOkSeveralItems() throws Exception {
        TodoItem todo = new TodoItem(1L, "Estudiar Java", false);
        TodoItem todo1 = new TodoItem(2L, "Practicando Spring Boot", false);
        Mockito.when(todoRepo.findAll()).thenReturn(Arrays.asList(todo, todo1));
        mockMvc.perform(get("/todo"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").doesNotExist())
                .andExpect(jsonPath("$[0].title").value("Estudiar Java"))
                .andExpect(jsonPath("$[0].done").value(false))
                .andExpect(jsonPath("$[1].id").doesNotExist())
                .andExpect(jsonPath("$[1].title").value("Practicando Spring Boot"))
                .andExpect(jsonPath("$[1].done").value(false));
    }
    @Test
    void testFindAllResponseOkEmptyResult() throws Exception {
        Mockito.when(todoRepo.findAll()).thenReturn(Collections.emptyList());
        mockMvc.perform(get("/todo"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0))
                .andExpect(jsonPath("$[0].id").doesNotExist())
                .andExpect(jsonPath("$[0].title").doesNotExist())
                .andExpect(jsonPath("$[0].done").doesNotExist());
    }
    // TODO: save Tests
    @Test
    void testSaveOneItemResponseOk() throws Exception {
        TodoItem todo = new TodoItem(null, "Estudiar Java", false);
        TodoItem savedTodo = new TodoItem(1L, "Estudiar Java", false);

        Mockito.when(todoRepo.save(Mockito.any(TodoItem.class))).thenReturn(savedTodo);

        mockMvc.perform(post("/todo")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(todo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").doesNotExist())
                .andExpect(jsonPath("$.title").value("Estudiar Java"))
                .andExpect(jsonPath("$.done").value(false));
    }
    @Test
    void testSaveEmptyItemResponseBadRequest() throws Exception {
        mockMvc.perform(post("/todo")
                        .contentType("application/json")
                        .content("{}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testSaveSeveralItemBadRequest() throws Exception {
        TodoItem todo = new TodoItem(null, "Estudiar Java", false);
        List<TodoItem> allItems = new ArrayList<>();
        allItems.add(todo);
        allItems.add(todo);
        TodoItem savedTodo = new TodoItem(1L, "Estudiar Java", false);

        Mockito.when(todoRepo.save(Mockito.any(TodoItem.class))).thenReturn(savedTodo);

        mockMvc.perform(post("/todo")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(allItems)))
                .andExpect(status().isBadRequest());
    }

    // TODO: update Tests
    @Test
    void testUpdateResponseOkItemUpdated() throws Exception {
        TodoItem updatedTodo = new TodoItem(1L, "Estudiar Java Avanzado", false);

        Mockito.when(todoRepo.save(Mockito.any(TodoItem.class))).thenReturn(updatedTodo);

        mockMvc.perform(put("/todo/1")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(updatedTodo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").doesNotExist())
                .andExpect(jsonPath("$.title").value("Estudiar Java Avanzado"))
                .andExpect(jsonPath("$.done").value(false));    }

    // TODO: delete Tests

}