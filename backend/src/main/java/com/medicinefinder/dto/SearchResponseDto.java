package com.medicinefinder.dto;

import com.medicinefinder.model.Medicine;
import com.medicinefinder.model.MedicineListing;
import com.medicinefinder.model.Pharmacy;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class SearchResponseDto {

    private Long listingId;
    private Long medicineId;
    private String brandName;
    private String genericName;
    private String category;
    private String dosageForm;
    private String strength;
    private Boolean prescriptionRequired;
    private String description;

    private String stockStatus;
    private String stockStatusLabel;
    private Integer availableQuantity;
    private BigDecimal unitPrice;
    private BigDecimal discountPercent;
    private BigDecimal effectivePrice;
    private String batchNumber;
    private LocalDate expiryDate;
    private String notes;
    private LocalDateTime lastReportedAt;

    private Long pharmacyId;
    private String pharmacyName;
    private String pharmacyLicense;
    private String pharmacyPhone;
    private String pharmacyEmail;
    private String pharmacyAddress;
    private String pharmacyArea;
    private String pharmacyCity;
    private String pharmacyPincode;
    private String pharmacyHours;
    private Boolean isVerified;

    public SearchResponseDto() {
    }

    public static SearchResponseDto fromListing(MedicineListing listing) {
        SearchResponseDto dto = new SearchResponseDto();
        dto.setListingId(listing.getId());

        Medicine m = listing.getMedicine();
        if (m != null) {
            dto.setMedicineId(m.getId());
            dto.setBrandName(m.getBrandName());
            dto.setGenericName(m.getGenericName());
            dto.setCategory(m.getCategory());
            dto.setDosageForm(m.getDosageForm());
            dto.setStrength(m.getStrength());
            dto.setPrescriptionRequired(m.getPrescriptionRequired());
            dto.setDescription(m.getDescription());
        }

        if (listing.getStockStatus() != null) {
            dto.setStockStatus(listing.getStockStatus().name());
            dto.setStockStatusLabel(listing.getStockStatus().getDisplayName());
        }

        dto.setAvailableQuantity(listing.getAvailableQuantity());
        dto.setUnitPrice(listing.getUnitPrice());
        dto.setDiscountPercent(listing.getDiscountPercent());

        if (listing.getUnitPrice() != null) {
            if (listing.getDiscountPercent() != null && listing.getDiscountPercent().compareTo(BigDecimal.ZERO) > 0) {
                BigDecimal multiplier = BigDecimal.ONE.subtract(listing.getDiscountPercent().divide(new BigDecimal(100), 4, RoundingMode.HALF_UP));
                dto.setEffectivePrice(listing.getUnitPrice().multiply(multiplier).setScale(2, RoundingMode.HALF_UP));
            } else {
                dto.setEffectivePrice(listing.getUnitPrice());
            }
        }

        dto.setBatchNumber(listing.getBatchNumber());
        dto.setExpiryDate(listing.getExpiryDate());
        dto.setNotes(listing.getNotes());
        dto.setLastReportedAt(listing.getLastReportedAt());

        Pharmacy p = listing.getPharmacy();
        if (p != null) {
            dto.setPharmacyId(p.getId());
            dto.setPharmacyName(p.getName());
            dto.setPharmacyLicense(p.getLicenseNumber());
            dto.setPharmacyPhone(p.getPhone());
            dto.setPharmacyEmail(p.getEmail());
            dto.setPharmacyAddress(p.getAddressLine());
            dto.setPharmacyArea(p.getArea());
            dto.setPharmacyCity(p.getCity());
            dto.setPharmacyPincode(p.getPincode());
            dto.setPharmacyHours(p.getOpeningHours());
            dto.setIsVerified(p.getIsVerified());
        }

        return dto;
    }

    // Getters and Setters
    public Long getListingId() {
        return listingId;
    }

    public void setListingId(Long listingId) {
        this.listingId = listingId;
    }

    public Long getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(Long medicineId) {
        this.medicineId = medicineId;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getGenericName() {
        return genericName;
    }

    public void setGenericName(String genericName) {
        this.genericName = genericName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDosageForm() {
        return dosageForm;
    }

    public void setDosageForm(String dosageForm) {
        this.dosageForm = dosageForm;
    }

    public String getStrength() {
        return strength;
    }

    public void setStrength(String strength) {
        this.strength = strength;
    }

    public Boolean getPrescriptionRequired() {
        return prescriptionRequired;
    }

    public void setPrescriptionRequired(Boolean prescriptionRequired) {
        this.prescriptionRequired = prescriptionRequired;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStockStatus() {
        return stockStatus;
    }

    public void setStockStatus(String stockStatus) {
        this.stockStatus = stockStatus;
    }

    public String getStockStatusLabel() {
        return stockStatusLabel;
    }

    public void setStockStatusLabel(String stockStatusLabel) {
        this.stockStatusLabel = stockStatusLabel;
    }

    public Integer getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(Integer availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(BigDecimal discountPercent) {
        this.discountPercent = discountPercent;
    }

    public BigDecimal getEffectivePrice() {
        return effectivePrice;
    }

    public void setEffectivePrice(BigDecimal effectivePrice) {
        this.effectivePrice = effectivePrice;
    }

    public String getBatchNumber() {
        return batchNumber;
    }

    public void setBatchNumber(String batchNumber) {
        this.batchNumber = batchNumber;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getLastReportedAt() {
        return lastReportedAt;
    }

    public void setLastReportedAt(LocalDateTime lastReportedAt) {
        this.lastReportedAt = lastReportedAt;
    }

    public Long getPharmacyId() {
        return pharmacyId;
    }

    public void setPharmacyId(Long pharmacyId) {
        this.pharmacyId = pharmacyId;
    }

    public String getPharmacyName() {
        return pharmacyName;
    }

    public void setPharmacyName(String pharmacyName) {
        this.pharmacyName = pharmacyName;
    }

    public String getPharmacyLicense() {
        return pharmacyLicense;
    }

    public void setPharmacyLicense(String pharmacyLicense) {
        this.pharmacyLicense = pharmacyLicense;
    }

    public String getPharmacyPhone() {
        return pharmacyPhone;
    }

    public void setPharmacyPhone(String pharmacyPhone) {
        this.pharmacyPhone = pharmacyPhone;
    }

    public String getPharmacyEmail() {
        return pharmacyEmail;
    }

    public void setPharmacyEmail(String pharmacyEmail) {
        this.pharmacyEmail = pharmacyEmail;
    }

    public String getPharmacyAddress() {
        return pharmacyAddress;
    }

    public void setPharmacyAddress(String pharmacyAddress) {
        this.pharmacyAddress = pharmacyAddress;
    }

    public String getPharmacyArea() {
        return pharmacyArea;
    }

    public void setPharmacyArea(String pharmacyArea) {
        this.pharmacyArea = pharmacyArea;
    }

    public String getPharmacyCity() {
        return pharmacyCity;
    }

    public void setPharmacyCity(String pharmacyCity) {
        this.pharmacyCity = pharmacyCity;
    }

    public String getPharmacyPincode() {
        return pharmacyPincode;
    }

    public void setPharmacyPincode(String pharmacyPincode) {
        this.pharmacyPincode = pharmacyPincode;
    }

    public String getPharmacyHours() {
        return pharmacyHours;
    }

    public void setPharmacyHours(String pharmacyHours) {
        this.pharmacyHours = pharmacyHours;
    }

    public Boolean getIsVerified() {
        return isVerified;
    }

    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }
}
