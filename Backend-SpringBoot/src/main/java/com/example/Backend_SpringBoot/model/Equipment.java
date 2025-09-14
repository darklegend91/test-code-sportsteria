package com.example.Backend_SpringBoot.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "equipment")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Equipment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String name;

    @Column(nullable=false)
    private Integer totalQuantity = 0;

    @Column(nullable=false)
    private Integer allottedQuantity = 0;

    public Integer getAvailable() {
        return Math.max(0, totalQuantity - allottedQuantity);
    }
}
