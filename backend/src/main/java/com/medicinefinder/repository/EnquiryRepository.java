package com.medicinefinder.repository;

import com.medicinefinder.model.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {

    List<Enquiry> findByPharmacyIdOrderByCreatedAtDesc(Long pharmacyId);

    List<Enquiry> findByCustomerPhoneOrderByCreatedAtDesc(String customerPhone);
}
