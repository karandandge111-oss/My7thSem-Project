package com.medicinefinder.service;

import com.medicinefinder.dto.SearchResponseDto;
import com.medicinefinder.model.Medicine;
import com.medicinefinder.model.MedicineListing;
import com.medicinefinder.model.StockStatus;
import com.medicinefinder.repository.MedicineListingRepository;
import com.medicinefinder.repository.MedicineRepository;
import com.medicinefinder.repository.PharmacyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class MedicineSearchService {

    private final MedicineListingRepository listingRepository;
    private final MedicineRepository medicineRepository;
    private final PharmacyRepository pharmacyRepository;

    public MedicineSearchService(MedicineListingRepository listingRepository,
                                 MedicineRepository medicineRepository,
                                 PharmacyRepository pharmacyRepository) {
        this.listingRepository = listingRepository;
        this.medicineRepository = medicineRepository;
        this.pharmacyRepository = pharmacyRepository;
    }

    public List<SearchResponseDto> search(String query, String area, String pincode, String dosageForm, String stockStatusStr) {
        StockStatus stockStatus = null;
        if (stockStatusStr != null && !stockStatusStr.trim().isEmpty() && !stockStatusStr.equalsIgnoreCase("ALL")) {
            try {
                stockStatus = StockStatus.valueOf(stockStatusStr.toUpperCase().trim());
            } catch (IllegalArgumentException ignored) {
            }
        }

        String cleanQuery = (query != null && !query.trim().isEmpty()) ? query.trim() : null;
        String cleanArea = (area != null && !area.trim().isEmpty() && !area.equalsIgnoreCase("ALL")) ? area.trim() : null;
        String cleanPincode = (pincode != null && !pincode.trim().isEmpty() && !pincode.equalsIgnoreCase("ALL")) ? pincode.trim() : null;
        String cleanDosage = (dosageForm != null && !dosageForm.trim().isEmpty() && !dosageForm.equalsIgnoreCase("ALL")) ? dosageForm.trim() : null;

        List<MedicineListing> listings = listingRepository.searchListings(cleanQuery, cleanArea, cleanPincode, cleanDosage, stockStatus);

        return listings.stream()
                .map(SearchResponseDto::fromListing)
                .collect(Collectors.toList());
    }

    public List<Medicine> getMedicines(String query) {
        if (query != null && !query.trim().isEmpty()) {
            return medicineRepository.searchMedicines(query.trim());
        }
        return medicineRepository.findAll();
    }

    public List<String> getDistinctAreas() {
        return pharmacyRepository.findDistinctAreas();
    }

    public List<String> getDistinctPincodes() {
        return pharmacyRepository.findDistinctPincodes();
    }

    public List<String> getDistinctCategories() {
        return medicineRepository.findDistinctCategories();
    }

    public List<String> getDistinctDosageForms() {
        return medicineRepository.findDistinctDosageForms();
    }
}
