package com.assessment.studentmanagement.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException() {
        super("Record not found");
    }
}