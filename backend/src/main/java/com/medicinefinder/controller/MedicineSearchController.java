package com.medicinefinder.controller;

import com.medicinefinder.dto.SearchResponseDto;
import com.medicinefinder.model.Medicine;
import com.medicinefinder.service.MedicineSearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MedicineSearchController {

    private final MedicineSearchService searchService;

    public MedicineSearchController(MedicineSearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<SearchResponseDto>> searchListings(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String area,
            @RequestParam(required = false) String pincode,
            @RequestParam(required = false) String dosageForm,
            @RequestParam(required = false) String stockStatus
    ) {
        List<SearchResponseDto> results = searchService.search(query, area, pincode, dosageForm, stockStatus);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/medicines")
    public ResponseEntity<List<Medicine>> getMedicines(@RequestParam(required = false) String query) {
        return ResponseEntity.ok(searchService.getMedicines(query));
    }

    @GetMapping("/metadata")
    public ResponseEntity<Map<String, Object>> getSearchMetadata() {
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("areas", searchService.getDistinctAreas());
        metadata.put("pincodes", searchService.getDistinctPincodes());
        metadata.put("categories", searchService.getDistinctCategories());
        metadata.put("dosageForms", searchService.getDistinctDosageForms());
        return ResponseEntity.ok(metadata);
    }
}
