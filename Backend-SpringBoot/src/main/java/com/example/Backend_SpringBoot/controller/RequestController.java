package com.example.Backend_SpringBoot.controller;

import com.example.Backend_SpringBoot.model.*;
import com.example.Backend_SpringBoot.repository.UserRepository;
import com.example.Backend_SpringBoot.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/requests")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @Autowired
    private UserRepository userRepository;

    // ----------------------
    // STUDENT ENDPOINTS
    // ----------------------

    // Get all requests of the logged-in student
    @GetMapping("/student")
    public List<RequestItem> getMyRequests(@AuthenticationPrincipal UserDetails ud) {
        var student = userRepository.findByUsername(ud.getUsername()).orElseThrow();
        return requestService.listForStudent(student);
    }

    // Create a request
    public static record CreateRequestDTO(Long equipmentId, Integer quantityRequested) {}
    @PostMapping("/student")
    public RequestItem createRequest(@AuthenticationPrincipal UserDetails ud,
                                     @RequestBody CreateRequestDTO dto) {
        var student = userRepository.findByUsername(ud.getUsername()).orElseThrow();
        int qty = dto.quantityRequested() == null ? 1 : dto.quantityRequested();
        return requestService.createRequest(student.getId(), dto.equipmentId(), qty);
    }

    // ----------------------
    // ADMIN ENDPOINTS
    // ----------------------

    // Get all requests
    @GetMapping("/admin")
    public List<RequestItem> getAllRequests() {
        return requestService.listAll();
    }

    // Approve a request
    @PutMapping("/admin/{id}/approve")
    public RequestItem approveRequest(@PathVariable Long id) {
        return requestService.changeStatus(id, RequestStatus.APPROVED);
    }

    // Reject a request
    @PutMapping("/admin/{id}/reject")
    public RequestItem rejectRequest(@PathVariable Long id) {
        return requestService.changeStatus(id, RequestStatus.REJECTED);
    }
}



//package com.example.Backend_SpringBoot.controller;
//
//import com.example.Backend_SpringBoot.model.*;
//import com.example.Backend_SpringBoot.repository.UserRepository;
//import com.example.Backend_SpringBoot.service.RequestService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:5173")
//@RequestMapping("/api")
//public class RequestController {
//
//    @Autowired private RequestService requestService;
//    @Autowired private UserRepository userRepository;
//
//    // GET all requests (for admin)
//    @GetMapping
//    public List<RequestItem> listAllRequests() {
//        return requestService.listAll();
//    }
//
//    // Student: list own requests
//    @GetMapping("/student/requests")
//    public List<RequestItem> myRequests(@AuthenticationPrincipal UserDetails ud) {
//        var user = userRepository.findByUsername(ud.getUsername()).orElseThrow();
//        return requestService.listForStudent(user);
//    }
//
//    // Student: create request (body: { equipmentId, quantityRequested })
//    public static record CreateReq(Long equipmentId, Integer quantityRequested) {}
//    @PostMapping("/student/requests")
//    public RequestItem createRequest(@AuthenticationPrincipal UserDetails ud, @RequestBody CreateReq body) {
//        var user = userRepository.findByUsername(ud.getUsername()).orElseThrow();
//        return requestService.createRequest(user.getId(), body.equipmentId(), body.quantityRequested()==null?1:body.quantityRequested());
//    }
//
//    // Admin: list all requests
//    @GetMapping("/admin/requests")
//    public List<RequestItem> allRequests() { return requestService.listAll(); }
//
//    // Admin approve/reject
//    @PutMapping("/admin/requests/{id}/approve")
//    public RequestItem approve(@PathVariable Long id) { return requestService.changeStatus(id, RequestStatus.APPROVED); }
//
//    @PutMapping("/admin/requests/{id}/reject")
//    public RequestItem reject(@PathVariable Long id) { return requestService.changeStatus(id, RequestStatus.REJECTED); }
//}
