package com.medicinefinder.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "medicine")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "brand_name", nullable = false, length = 150)
    private String brandName;

    @NotBlank
    @Column(name = "generic_name", nullable = false, length = 150)
    private String genericName;

    @Column(name = "manufacturer", length = 150)
    private String manufacturer;

    @Column(name = "category", length = 80)
    private String category;

    @NotBlank
    @Column(name = "dosage_form", nullable = false, length = 50)
    private String dosageForm; // Tablet, Capsule, Syrup, Injection, Ointment, Drops, Inhaler

    @NotBlank
    @Column(name = "strength", nullable = false, length = 50)
    private String strength; // e.g. "500 mg", "625 mg", "100 ml"

    @Column(name = "prescription_required")
    private Boolean prescriptionRequired = false;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Medicine() {
    }

    public Medicine(String brandName, String genericName, String manufacturer, String category, String dosageForm, String strength, Boolean prescriptionRequired, String description) {
        this.brandName = brandName;
        this.genericName = genericName;
        this.manufacturer = manufacturer;
        this.category = category;
        this.dosageForm = dosageForm;
        this.strength = strength;
        this.prescriptionRequired = prescriptionRequired;
        this.description = description;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
