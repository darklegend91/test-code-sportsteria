package com.example.Backend_SpringBoot.model;

import jakarta.persistence.*;

@Entity
public class RequestItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User student;

    @ManyToOne
    private Equipment equipment;

    private int quantityRequested;

    @Enumerated(EnumType.STRING)  // Store enum as string in DB
    private RequestStatus status; // ✅ FIX: Use RequestStatus

    // --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }

    public Equipment getEquipment() { return equipment; }
    public void setEquipment(Equipment equipment) { this.equipment = equipment; }

    public int getQuantityRequested() { return quantityRequested; }
    public void setQuantityRequested(int quantityRequested) { this.quantityRequested = quantityRequested; }

    public RequestStatus getStatus() { return status; }
    public void setStatus(RequestStatus status) { this.status = status; }
}
//
//package com.example.Backend_SpringBoot.model;
//
//import jakarta.persistence.*;
//import lombok.*;
//import java.time.Instant;
//
//@Entity
//@Table(name = "requests")
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class RequestItem {
//    public enum Status { PENDING, APPROVED, REJECTED }
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name="student_id", nullable=false)
//    private User student;
//
//    @ManyToOne
//    @JoinColumn(name="equipment_id", nullable=false)
//    private Equipment equipment;
//
//    @Column(nullable=false)
//    private Integer quantityRequested;
//
//    @Enumerated(EnumType.STRING)
//    @Column(nullable=false)
//    private Status status = Status.PENDING;
//
//    @Column(nullable=false)
//    private Instant requestDate = Instant.now();
//}
