package com.assessment.studentmanagement.controller;

import com.assessment.studentmanagement.dao.Student;
import com.assessment.studentmanagement.dto.StudentRequest;
import com.assessment.studentmanagement.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin("http://localhost:4200")
public class StudentController {
    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Student> all() {
        return service.all();
    }

    @GetMapping("/{id}")
    public Student get(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student add(@Valid @RequestBody StudentRequest request) {
        return service.save(null, request);
    }

    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @Valid @RequestBody StudentRequest request) {
        return service.save(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}