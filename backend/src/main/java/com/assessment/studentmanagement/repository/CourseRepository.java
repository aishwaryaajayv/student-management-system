package com.assessment.studentmanagement.repository;

import com.assessment.studentmanagement.dao.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}