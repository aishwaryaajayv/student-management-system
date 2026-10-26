package com.assessment.studentmanagement.service;

import com.assessment.studentmanagement.dao.Course;
import com.assessment.studentmanagement.dto.CourseRequest;
import com.assessment.studentmanagement.exception.ResourceNotFoundException;
import com.assessment.studentmanagement.repository.CourseRepository;
import com.assessment.studentmanagement.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepository courses;
    private final StudentRepository students;

    public CourseService(CourseRepository courses, StudentRepository students) {
        this.courses = courses;
        this.students = students;
    }

    public List<Course> all() {
        return courses.findAll();
    }

    public Course get(Long id) {
        return courses.findById(id).orElseThrow(ResourceNotFoundException::new);
    }

    @Transactional
    public Course save(Long id, CourseRequest request) {
        Course course = id == null ? new Course() : get(id);
        course.name = request.name().trim();
        return courses.save(course);
    }

    @Transactional
    public void delete(Long id) {
        Course course = get(id);
        students.findAll().forEach(s -> s.courses.removeIf(c -> c.id.equals(id)));
        courses.delete(course);
    }
}