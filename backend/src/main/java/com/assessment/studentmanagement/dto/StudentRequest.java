package com.assessment.studentmanagement.dto;

import jakarta.validation.constraints.*;

import java.util.Set;

public record StudentRequest(@NotBlank String name, @NotBlank @Email String email, Set<Long> courseIds) {
}