package com.assessment.studentmanagement.service;


import com.assessment.studentmanagement.dao.Student;
import com.assessment.studentmanagement.dto.StudentRequest;
import com.assessment.studentmanagement.exception.ResourceNotFoundException;
import com.assessment.studentmanagement.repository.CourseRepository;
import com.assessment.studentmanagement.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class StudentService {
    private final StudentRepository students;
    private final CourseRepository courses;

    public StudentService(StudentRepository students, CourseRepository courses) {
        this.students = students;
        this.courses = courses;
    }

    public List<Student> all() {
        return students.findAll();
    }

    public Student get(Long id) {
        return students.findById(id).orElseThrow(ResourceNotFoundException::new);
    }

    @Transactional
    public Student save(Long id, StudentRequest request) {
        Student student = id == null ? new Student() : get(id);
        student.name = request.name().trim();
        student.email = request.email().trim();
        Set<Long> ids = request.courseIds() == null ? Set.of() : request.courseIds();
        var selected = courses.findAllById(ids);
        if (selected.size() != ids.size()) throw new IllegalArgumentException("Invalid course");
        student.courses = new HashSet<>(selected);
        return students.save(student);
    }

    @Transactional
    public void delete(Long id) {
        students.delete(get(id));
    }
}