package com.assessment.studentmanagement.repository;

import com.assessment.studentmanagement.dao.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {}