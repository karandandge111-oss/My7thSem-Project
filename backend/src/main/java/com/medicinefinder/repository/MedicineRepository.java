package com.medicinefinder.repository;

import com.medicinefinder.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    Optional<Medicine> findByBrandNameIgnoreCaseAndDosageFormIgnoreCaseAndStrengthIgnoreCase(
        String brandName, String dosageForm, String strength
    );

    @Query("SELECT m FROM Medicine m WHERE " +
           "LOWER(m.brandName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(m.genericName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(m.category) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Medicine> searchMedicines(@Param("query") String query);

    @Query("SELECT DISTINCT m.category FROM Medicine m WHERE m.category IS NOT NULL ORDER BY m.category ASC")
    List<String> findDistinctCategories();

    @Query("SELECT DISTINCT m.dosageForm FROM Medicine m ORDER BY m.dosageForm ASC")
    List<String> findDistinctDosageForms();
}
