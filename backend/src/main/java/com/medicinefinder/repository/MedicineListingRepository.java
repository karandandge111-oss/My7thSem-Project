package com.medicinefinder.repository;

import com.medicinefinder.model.MedicineListing;
import com.medicinefinder.model.StockStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicineListingRepository extends JpaRepository<MedicineListing, Long> {

    List<MedicineListing> findByPharmacyIdOrderByUpdatedAtDesc(Long pharmacyId);

    Optional<MedicineListing> findByPharmacyIdAndMedicineId(Long pharmacyId, Long medicineId);

    @Query("SELECT l FROM MedicineListing l " +
           "JOIN l.medicine m " +
           "JOIN l.pharmacy p " +
           "WHERE (:query IS NULL OR :query = '' OR " +
           "       LOWER(m.brandName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "       LOWER(m.genericName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "       LOWER(m.category) LIKE LOWER(CONCAT('%', :query, '%'))) " +
           "AND (:area IS NULL OR :area = '' OR LOWER(p.area) = LOWER(:area)) " +
           "AND (:pincode IS NULL OR :pincode = '' OR p.pincode = :pincode) " +
           "AND (:dosageForm IS NULL OR :dosageForm = '' OR LOWER(m.dosageForm) = LOWER(:dosageForm)) " +
           "AND (:stockStatus IS NULL OR l.stockStatus = :stockStatus) " +
           "ORDER BY " +
           "  CASE WHEN l.stockStatus = 'IN_STOCK' THEN 1 " +
           "       WHEN l.stockStatus = 'LOW_STOCK' THEN 2 " +
           "       ELSE 3 END ASC, " +
           "  l.lastReportedAt DESC")
    List<MedicineListing> searchListings(
        @Param("query") String query,
        @Param("area") String area,
        @Param("pincode") String pincode,
        @Param("dosageForm") String dosageForm,
        @Param("stockStatus") StockStatus stockStatus
    );

    @Query("SELECT COUNT(l) FROM MedicineListing l WHERE l.pharmacy.id = :pharmacyId")
    long countByPharmacyId(@Param("pharmacyId") Long pharmacyId);

    @Query("SELECT COUNT(l) FROM MedicineListing l WHERE l.pharmacy.id = :pharmacyId AND l.stockStatus = :stockStatus")
    long countByPharmacyIdAndStockStatus(@Param("pharmacyId") Long pharmacyId, @Param("stockStatus") StockStatus stockStatus);
}
