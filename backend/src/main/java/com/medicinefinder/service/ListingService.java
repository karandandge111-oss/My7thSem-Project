package com.medicinefinder.service;

import com.medicinefinder.dto.ListingRequestDto;
import com.medicinefinder.dto.SearchResponseDto;
import com.medicinefinder.model.Medicine;
import com.medicinefinder.model.MedicineListing;
import com.medicinefinder.model.Pharmacy;
import com.medicinefinder.model.StockStatus;
import com.medicinefinder.repository.MedicineListingRepository;
import com.medicinefinder.repository.MedicineRepository;
import com.medicinefinder.repository.PharmacyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class ListingService {

    private final MedicineListingRepository listingRepository;
    private final MedicineRepository medicineRepository;
    private final PharmacyRepository pharmacyRepository;

    public ListingService(MedicineListingRepository listingRepository,
                          MedicineRepository medicineRepository,
                          PharmacyRepository pharmacyRepository) {
        this.listingRepository = listingRepository;
        this.medicineRepository = medicineRepository;
        this.pharmacyRepository = pharmacyRepository;
    }

    @Transactional(readOnly = true)
    public List<SearchResponseDto> getPharmacyListings(Long pharmacyId) {
        return listingRepository.findByPharmacyIdOrderByUpdatedAtDesc(pharmacyId).stream()
                .map(SearchResponseDto::fromListing)
                .collect(Collectors.toList());
    }

    public SearchResponseDto createOrUpdateListing(Long pharmacyId, ListingRequestDto dto) {
        Pharmacy pharmacy = pharmacyRepository.findById(pharmacyId)
                .orElseThrow(() -> new IllegalArgumentException("Pharmacy not found with id: " + pharmacyId));

        Medicine medicine;
        if (dto.getMedicineId() != null) {
            medicine = medicineRepository.findById(dto.getMedicineId())
                    .orElseThrow(() -> new IllegalArgumentException("Medicine not found with id: " + dto.getMedicineId()));
        } else {
            // Find existing or create new medicine
            medicine = medicineRepository.findByBrandNameIgnoreCaseAndDosageFormIgnoreCaseAndStrengthIgnoreCase(
                    dto.getBrandName(), dto.getDosageForm(), dto.getStrength()
            ).orElseGet(() -> {
                Medicine m = new Medicine(
                        dto.getBrandName(),
                        dto.getGenericName(),
                        dto.getManufacturer(),
                        dto.getCategory(),
                        dto.getDosageForm(),
                        dto.getStrength(),
                        dto.getPrescriptionRequired() != null ? dto.getPrescriptionRequired() : false,
                        dto.getDescription()
                );
                return medicineRepository.save(m);
            });
        }

        // Check if listing already exists
        MedicineListing listing = listingRepository.findByPharmacyIdAndMedicineId(pharmacyId, medicine.getId())
                .orElse(new MedicineListing());

        listing.setPharmacy(pharmacy);
        listing.setMedicine(medicine);

        StockStatus status = StockStatus.IN_STOCK;
        if (dto.getStockStatus() != null) {
            try {
                status = StockStatus.valueOf(dto.getStockStatus().toUpperCase());
            } catch (Exception ignored) {
            }
        }
        listing.setStockStatus(status);
        listing.setAvailableQuantity(dto.getAvailableQuantity() != null ? dto.getAvailableQuantity() : 0);
        listing.setUnitPrice(dto.getUnitPrice());
        listing.setDiscountPercent(dto.getDiscountPercent() != null ? dto.getDiscountPercent() : BigDecimal.ZERO);
        listing.setBatchNumber(dto.getBatchNumber());
        listing.setExpiryDate(dto.getExpiryDate());
        listing.setNotes(dto.getNotes());
        listing.setLastReportedAt(LocalDateTime.now());
        listing.setUpdatedAt(LocalDateTime.now());

        MedicineListing saved = listingRepository.save(listing);
        return SearchResponseDto.fromListing(saved);
    }

    public SearchResponseDto updateStockStatus(Long listingId, Long pharmacyId, String statusStr, Integer quantity, BigDecimal unitPrice) {
        MedicineListing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new IllegalArgumentException("Listing not found with id: " + listingId));

        if (!listing.getPharmacy().getId().equals(pharmacyId)) {
            throw new SecurityException("Not authorized to modify this pharmacy's listing");
        }

        if (statusStr != null) {
            try {
                listing.setStockStatus(StockStatus.valueOf(statusStr.toUpperCase()));
            } catch (Exception ignored) {
            }
        }

        if (quantity != null) {
            listing.setAvailableQuantity(quantity);
            if (quantity <= 0) {
                listing.setStockStatus(StockStatus.OUT_OF_STOCK);
            } else if (quantity < 10 && listing.getStockStatus() == StockStatus.IN_STOCK) {
                listing.setStockStatus(StockStatus.LOW_STOCK);
            }
        }

        if (unitPrice != null) {
            listing.setUnitPrice(unitPrice);
        }

        listing.setLastReportedAt(LocalDateTime.now());
        listing.setUpdatedAt(LocalDateTime.now());

        MedicineListing saved = listingRepository.save(listing);
        return SearchResponseDto.fromListing(saved);
    }

    public void deleteListing(Long listingId, Long pharmacyId) {
        MedicineListing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new IllegalArgumentException("Listing not found with id: " + listingId));

        if (!listing.getPharmacy().getId().equals(pharmacyId)) {
            throw new SecurityException("Not authorized to delete this pharmacy's listing");
        }

        listingRepository.delete(listing);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getPharmacyStats(Long pharmacyId) {
        long total = listingRepository.countByPharmacyId(pharmacyId);
        long inStock = listingRepository.countByPharmacyIdAndStockStatus(pharmacyId, StockStatus.IN_STOCK);
        long lowStock = listingRepository.countByPharmacyIdAndStockStatus(pharmacyId, StockStatus.LOW_STOCK);
        long outOfStock = listingRepository.countByPharmacyIdAndStockStatus(pharmacyId, StockStatus.OUT_OF_STOCK);

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalListings", total);
        stats.put("inStockCount", inStock);
        stats.put("lowStockCount", lowStock);
        stats.put("outOfStockCount", outOfStock);
        return stats;
    }
}
