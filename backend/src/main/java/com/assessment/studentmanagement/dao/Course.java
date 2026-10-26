package com.assessment.studentmanagement.dao;

import jakarta.persistence.*;

@Entity
public class Course {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(nullable = false, unique = true)
    public String name;
}