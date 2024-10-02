package com.example.projectbackend.repository;

import com.example.projectbackend.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    // Buraya özel sorgular ekleyebilirsiniz, örneğin:
    Department findByName(String name);
}
