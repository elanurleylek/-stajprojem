package com.example.projectbackend.service;

import com.example.projectbackend.model.Department;
import com.example.projectbackend.model.Student;
import com.example.projectbackend.repository.DepartmentRepository; // Import DepartmentRepository
import com.example.projectbackend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private DepartmentRepository departmentRepository; // Ekleyin

    // Tüm öğrencileri listeleme
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Belirli bir öğrenci getirme
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    @Transactional
    public Student createStudent(Student student) {
        // Departmanı veritabanından yükleyin
        Department department = departmentRepository.findById(student.getDepartment().getId())
                .orElseThrow(() -> new RuntimeException("Department not found"));
        student.setDepartment(department);
        return studentRepository.save(student); // Sadece student'ı kaydedin
    }

    // Var olan bir öğrenciyi güncelleme
    @Transactional // Ekleyin
    public Student updateStudent(Long id, Student studentDetails) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            student.setName(studentDetails.getName()); // Öğrencinin ismini güncelle

            // Departmanı güncelleme
            Department department = departmentRepository.findById(studentDetails.getDepartment().getId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            student.setDepartment(department); // Geçerli departmanı ayarla

            return studentRepository.save(student); // Güncellenen öğrenci kaydedilir
        } else {
            throw new RuntimeException("Student not found with id: " + id); // Öğrenci bulunamazsa hata
        }
    }

    // Öğrenci silme
    @Transactional // Ekleyin
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}
