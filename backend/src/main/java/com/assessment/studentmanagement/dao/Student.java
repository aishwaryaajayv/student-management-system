package com.assessment.studentmanagement.dao;

import jakarta.persistence.*;

import java.util.*;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(nullable = false)
    public String name;
    @Column(nullable = false, unique = true)
    public String email;
    @ManyToMany(fetch = FetchType.EAGER)
    public Set<Course> courses = new HashSet<>();
}