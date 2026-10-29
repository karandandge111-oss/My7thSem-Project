package com.medicinefinder.repository;

import com.medicinefinder.model.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PharmacyRepository extends JpaRepository<Pharmacy, Long> {

    Optional<Pharmacy> findByLicenseNumber(String licenseNumber);

    boolean existsByLicenseNumber(String licenseNumber);

    List<Pharmacy> findByAreaIgnoreCase(String area);

    List<Pharmacy> findByPincode(String pincode);

    @Query("SELECT DISTINCT p.area FROM Pharmacy p ORDER BY p.area ASC")
    List<String> findDistinctAreas();

    @Query("SELECT DISTINCT p.pincode FROM Pharmacy p ORDER BY p.pincode ASC")
    List<String> findDistinctPincodes();
}
