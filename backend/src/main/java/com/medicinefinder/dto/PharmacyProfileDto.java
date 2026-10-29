package com.medicinefinder.dto;

import com.medicinefinder.model.Pharmacy;
import jakarta.validation.constraints.NotBlank;

public class PharmacyProfileDto {

    private Long id;

    @NotBlank(message = "Pharmacy name is required")
    private String name;

    @NotBlank(message = "License number is required")
    private String licenseNumber;

    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotBlank(message = "Address line is required")
    private String addressLine;

    @NotBlank(message = "Area is required")
    private String area;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Pincode is required")
    private String pincode;

    private String openingHours;
    private Boolean isVerified;

    public PharmacyProfileDto() {
    }

    public static PharmacyProfileDto fromEntity(Pharmacy pharmacy) {
        if (pharmacy == null) return null;
        PharmacyProfileDto dto = new PharmacyProfileDto();
        dto.setId(pharmacy.getId());
        dto.setName(pharmacy.getName());
        dto.setLicenseNumber(pharmacy.getLicenseNumber());
        dto.setEmail(pharmacy.getEmail());
        dto.setPhone(pharmacy.getPhone());
        dto.setAddressLine(pharmacy.getAddressLine());
        dto.setArea(pharmacy.getArea());
        dto.setCity(pharmacy.getCity());
        dto.setPincode(pharmacy.getPincode());
        dto.setOpeningHours(pharmacy.getOpeningHours());
        dto.setIsVerified(pharmacy.getIsVerified());
        return dto;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddressLine() {
        return addressLine;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getOpeningHours() {
        return openingHours;
    }

    public void setOpeningHours(String openingHours) {
        this.openingHours = openingHours;
    }

    public Boolean getIsVerified() {
        return isVerified;
    }

    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }
}
