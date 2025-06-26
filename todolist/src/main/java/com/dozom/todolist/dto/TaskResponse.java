package com.dozom.todolist.dto;

public record TaskResponse(
        Long id,
        String title,
        Boolean done
) { }
