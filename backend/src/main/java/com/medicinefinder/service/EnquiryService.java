package com.medicinefinder.service;

import com.medicinefinder.dto.EnquiryDto;
import com.medicinefinder.model.Enquiry;
import com.medicinefinder.model.MedicineListing;
import com.medicinefinder.model.Pharmacy;
import com.medicinefinder.repository.EnquiryRepository;
import com.medicinefinder.repository.MedicineListingRepository;
import com.medicinefinder.repository.PharmacyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EnquiryService {

    private final EnquiryRepository enquiryRepository;
    private final PharmacyRepository pharmacyRepository;
    private final MedicineListingRepository listingRepository;

    public EnquiryService(EnquiryRepository enquiryRepository,
                          PharmacyRepository pharmacyRepository,
                          MedicineListingRepository listingRepository) {
        this.enquiryRepository = enquiryRepository;
        this.pharmacyRepository = pharmacyRepository;
        this.listingRepository = listingRepository;
    }

    public EnquiryDto createEnquiry(EnquiryDto dto) {
        Pharmacy pharmacy = null;
        MedicineListing listing = null;

        if (dto.getListingId() != null) {
            listing = listingRepository.findById(dto.getListingId()).orElse(null);
            if (listing != null) {
                pharmacy = listing.getPharmacy();
            }
        }

        if (pharmacy == null && dto.getPharmacyId() != null) {
            pharmacy = pharmacyRepository.findById(dto.getPharmacyId())
                    .orElseThrow(() -> new IllegalArgumentException("Pharmacy not found with id: " + dto.getPharmacyId()));
        }

        if (pharmacy == null) {
            throw new IllegalArgumentException("Pharmacy ID or valid Listing ID must be provided");
        }

        Enquiry enquiry = new Enquiry(
                dto.getCustomerName(),
                dto.getCustomerPhone(),
                dto.getCustomerEmail(),
                pharmacy,
                listing,
                dto.getMedicineName(),
                dto.getRequestedQuantity(),
                dto.getNotes()
        );

        Enquiry saved = enquiryRepository.save(enquiry);
        return EnquiryDto.fromEntity(saved);
    }

    @Transactional(readOnly = true)
    public List<EnquiryDto> getPharmacyEnquiries(Long pharmacyId) {
        return enquiryRepository.findByPharmacyIdOrderByCreatedAtDesc(pharmacyId).stream()
                .map(EnquiryDto::fromEntity)
                .collect(Collectors.toList());
    }

    public EnquiryDto updateStatus(Long enquiryId, String status) {
        Enquiry enquiry = enquiryRepository.findById(enquiryId)
                .orElseThrow(() -> new IllegalArgumentException("Enquiry not found with id: " + enquiryId));
        enquiry.setStatus(status.toUpperCase());
        Enquiry saved = enquiryRepository.save(enquiry);
        return EnquiryDto.fromEntity(saved);
    }
}
