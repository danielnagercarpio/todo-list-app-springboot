package com.dozom.todolist.dto;

import jakarta.validation.constraints.NotBlank;

public record TaskRequest(
        Integer id,
        @NotBlank String title,
        Boolean done
) {
};
