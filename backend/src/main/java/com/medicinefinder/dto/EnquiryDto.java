package com.medicinefinder.dto;

import com.medicinefinder.model.Enquiry;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class EnquiryDto {

    private Long id;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Customer phone is required")
    private String customerPhone;

    private String customerEmail;
    private Long pharmacyId;
    private String pharmacyName;
    private Long listingId;

    @NotBlank(message = "Medicine name is required")
    private String medicineName;

    private Integer requestedQuantity = 1;
    private String notes;
    private String status;
    private LocalDateTime createdAt;

    public EnquiryDto() {
    }

    public static EnquiryDto fromEntity(Enquiry e) {
        if (e == null) return null;
        EnquiryDto dto = new EnquiryDto();
        dto.setId(e.getId());
        dto.setCustomerName(e.getCustomerName());
        dto.setCustomerPhone(e.getCustomerPhone());
        dto.setCustomerEmail(e.getCustomerEmail());
        if (e.getPharmacy() != null) {
            dto.setPharmacyId(e.getPharmacy().getId());
            dto.setPharmacyName(e.getPharmacy().getName());
        }
        if (e.getMedicineListing() != null) {
            dto.setListingId(e.getMedicineListing().getId());
        }
        dto.setMedicineName(e.getMedicineName());
        dto.setRequestedQuantity(e.getRequestedQuantity());
        dto.setNotes(e.getNotes());
        dto.setStatus(e.getStatus());
        dto.setCreatedAt(e.getCreatedAt());
        return dto;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
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

    public Long getListingId() {
        return listingId;
    }

    public void setListingId(Long listingId) {
        this.listingId = listingId;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public Integer getRequestedQuantity() {
        return requestedQuantity;
    }

    public void setRequestedQuantity(Integer requestedQuantity) {
        this.requestedQuantity = requestedQuantity;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
