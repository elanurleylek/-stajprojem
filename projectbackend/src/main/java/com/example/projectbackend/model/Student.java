package com.example.projectbackend.model;

import com.example.projectbackend.model.Department;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "students" )
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // Öğrenci ismi için bir alan.

    @OneToOne(cascade = CascadeType.ALL) // Öğrenci ve departman arasında birebir ilişki.
    @JoinColumn(name = "department_id", referencedColumnName = "id") // İlişki için yabancı anahtar.
    private Department department; // Her öğrencinin bir departmanı olacak.
}
