package com.example.Backend_SpringBoot.service;

import com.example.Backend_SpringBoot.model.*;
import com.example.Backend_SpringBoot.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {

    @Autowired private RequestRepository requestRepository;
    @Autowired private EquipmentRepository equipmentRepository;
    @Autowired private UserRepository userRepository;

    public List<RequestItem> listAll() {
        return requestRepository.findAll();
    }

    public List<RequestItem> listForStudent(User student) {
        return requestRepository.findByStudent(student);
    }

    public RequestItem createRequest(Long studentId, Long equipmentId, int qty) {
        User student = userRepository.findById(studentId).orElseThrow();
        Equipment eq = equipmentRepository.findById(equipmentId).orElseThrow();

        if (eq.getAvailable() < qty) {
            throw new RuntimeException("Not enough available");
        }

        RequestItem r = new RequestItem();
        r.setStudent(student);
        r.setEquipment(eq);
        r.setQuantityRequested(qty);
        r.setStatus(RequestStatus.PENDING);

        return requestRepository.save(r);
    }

    public RequestItem changeStatus(Long requestId, RequestStatus status) {
        RequestItem r = requestRepository.findById(requestId).orElseThrow();

        if (r.getStatus() != RequestStatus.PENDING) return r;

        r.setStatus(status);

        if (status == RequestStatus.APPROVED) {
            Equipment eq = r.getEquipment();
            eq.setAllottedQuantity(eq.getAllottedQuantity() + r.getQuantityRequested());
            equipmentRepository.save(eq);
        }

        return requestRepository.save(r);
    }
}
