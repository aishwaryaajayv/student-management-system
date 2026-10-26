package com.assessment.studentmanagement.controller;

import com.assessment.studentmanagement.dao.Course;
import com.assessment.studentmanagement.dto.CourseRequest;
import com.assessment.studentmanagement.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin("http://localhost:4200")
public class CourseController {
    private final CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    @GetMapping
    public List<Course> all() {
        return service.all();
    }

    @GetMapping("/{id}")
    public Course get(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Course add(@Valid @RequestBody CourseRequest request) {
        return service.save(null, request);
    }

    @PutMapping("/{id}")
    public Course update(@PathVariable Long id, @Valid @RequestBody CourseRequest request) {
        return service.save(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}