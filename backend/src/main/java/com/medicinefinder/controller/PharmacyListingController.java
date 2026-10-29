package com.medicinefinder.controller;

import com.medicinefinder.dto.ListingRequestDto;
import com.medicinefinder.dto.PharmacyProfileDto;
import com.medicinefinder.dto.SearchResponseDto;
import com.medicinefinder.service.ListingService;
import com.medicinefinder.service.PharmacyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pharmacy")
public class PharmacyListingController {

    private final ListingService listingService;
    private final PharmacyService pharmacyService;

    public PharmacyListingController(ListingService listingService, PharmacyService pharmacyService) {
        this.listingService = listingService;
        this.pharmacyService = pharmacyService;
    }

    @GetMapping("/{pharmacyId}/listings")
    public ResponseEntity<List<SearchResponseDto>> getListings(@PathVariable Long pharmacyId) {
        return ResponseEntity.ok(listingService.getPharmacyListings(pharmacyId));
    }

    @PostMapping("/{pharmacyId}/listings")
    public ResponseEntity<SearchResponseDto> createOrUpdateListing(
            @PathVariable Long pharmacyId,
            @Valid @RequestBody ListingRequestDto dto
    ) {
        SearchResponseDto result = listingService.createOrUpdateListing(pharmacyId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PatchMapping("/{pharmacyId}/listings/{listingId}")
    public ResponseEntity<SearchResponseDto> updateStock(
            @PathVariable Long pharmacyId,
            @PathVariable Long listingId,
            @RequestBody Map<String, Object> body
    ) {
        String stockStatus = (String) body.get("stockStatus");
        Integer quantity = body.get("availableQuantity") != null ? ((Number) body.get("availableQuantity")).intValue() : null;
        BigDecimal unitPrice = body.get("unitPrice") != null ? new BigDecimal(body.get("unitPrice").toString()) : null;

        SearchResponseDto updated = listingService.updateStockStatus(listingId, pharmacyId, stockStatus, quantity, unitPrice);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{pharmacyId}/listings/{listingId}")
    public ResponseEntity<Map<String, String>> deleteListing(
            @PathVariable Long pharmacyId,
            @PathVariable Long listingId
    ) {
        listingService.deleteListing(listingId, pharmacyId);
        return ResponseEntity.ok(Map.of("message", "Listing successfully removed"));
    }

    @GetMapping("/{pharmacyId}/stats")
    public ResponseEntity<Map<String, Object>> getStats(@PathVariable Long pharmacyId) {
        return ResponseEntity.ok(listingService.getPharmacyStats(pharmacyId));
    }

    @GetMapping("/{pharmacyId}/profile")
    public ResponseEntity<PharmacyProfileDto> getProfile(@PathVariable Long pharmacyId) {
        return ResponseEntity.ok(pharmacyService.getProfile(pharmacyId));
    }

    @PutMapping("/{pharmacyId}/profile")
    public ResponseEntity<PharmacyProfileDto> updateProfile(
            @PathVariable Long pharmacyId,
            @Valid @RequestBody PharmacyProfileDto dto
    ) {
        return ResponseEntity.ok(pharmacyService.updateProfile(pharmacyId, dto));
    }
}
