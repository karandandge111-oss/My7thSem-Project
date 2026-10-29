package com.medicinefinder.service;

import com.medicinefinder.dto.PharmacyProfileDto;
import com.medicinefinder.model.Pharmacy;
import com.medicinefinder.repository.PharmacyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PharmacyService {

    private final PharmacyRepository pharmacyRepository;

    public PharmacyService(PharmacyRepository pharmacyRepository) {
        this.pharmacyRepository = pharmacyRepository;
    }

    @Transactional(readOnly = true)
    public PharmacyProfileDto getProfile(Long pharmacyId) {
        Pharmacy pharmacy = pharmacyRepository.findById(pharmacyId)
                .orElseThrow(() -> new IllegalArgumentException("Pharmacy not found with id: " + pharmacyId));
        return PharmacyProfileDto.fromEntity(pharmacy);
    }

    public PharmacyProfileDto updateProfile(Long pharmacyId, PharmacyProfileDto dto) {
        Pharmacy pharmacy = pharmacyRepository.findById(pharmacyId)
                .orElseThrow(() -> new IllegalArgumentException("Pharmacy not found with id: " + pharmacyId));

        pharmacy.setName(dto.getName());
        pharmacy.setPhone(dto.getPhone());
        pharmacy.setEmail(dto.getEmail());
        pharmacy.setAddressLine(dto.getAddressLine());
        pharmacy.setArea(dto.getArea());
        pharmacy.setCity(dto.getCity());
        pharmacy.setPincode(dto.getPincode());
        pharmacy.setOpeningHours(dto.getOpeningHours());

        Pharmacy saved = pharmacyRepository.save(pharmacy);
        return PharmacyProfileDto.fromEntity(saved);
    }

    @Transactional(readOnly = true)
    public List<Pharmacy> getAllPharmacies() {
        return pharmacyRepository.findAll();
    }
}
