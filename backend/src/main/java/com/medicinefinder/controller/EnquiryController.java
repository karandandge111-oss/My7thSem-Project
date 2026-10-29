package com.medicinefinder.controller;

import com.medicinefinder.dto.EnquiryDto;
import com.medicinefinder.service.EnquiryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {

    private final EnquiryService enquiryService;

    public EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @PostMapping
    public ResponseEntity<EnquiryDto> createEnquiry(@Valid @RequestBody EnquiryDto dto) {
        EnquiryDto result = enquiryService.createEnquiry(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping("/pharmacy/{pharmacyId}")
    public ResponseEntity<List<EnquiryDto>> getPharmacyEnquiries(@PathVariable Long pharmacyId) {
        return ResponseEntity.ok(enquiryService.getPharmacyEnquiries(pharmacyId));
    }

    @PatchMapping("/{enquiryId}/status")
    public ResponseEntity<EnquiryDto> updateStatus(
            @PathVariable Long enquiryId,
            @RequestBody Map<String, String> body
    ) {
        String status = body.get("status");
        if (status == null || status.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(enquiryService.updateStatus(enquiryId, status));
    }
}
