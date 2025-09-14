package com.example.Backend_SpringBoot.service;

import com.example.Backend_SpringBoot.model.Equipment;
import com.example.Backend_SpringBoot.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentService {
    @Autowired private EquipmentRepository repo;

    public List<Equipment> listAll() { return repo.findAll(); }
    public Equipment add(Equipment e) {
        if (repo.existsByName(e.getName())) throw new RuntimeException("Equipment exists");
        e.setAllottedQuantity(0);
        return repo.save(e);
    }
    public void delete(Long id) { repo.deleteById(id); }
    public Equipment findById(Long id) { return repo.findById(id).orElseThrow(); }
}
