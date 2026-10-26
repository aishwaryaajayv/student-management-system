package com.assessment.studentmanagement.dto;

import jakarta.validation.constraints.*;

public record CourseRequest(@NotBlank String name) {
}