package com.medicinefinder.service;

import com.medicinefinder.dto.AuthRequest;
import com.medicinefinder.dto.AuthResponse;
import com.medicinefinder.model.AppUser;
import com.medicinefinder.model.Pharmacy;
import com.medicinefinder.repository.AppUserRepository;
import com.medicinefinder.repository.PharmacyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.UUID;

@Service
@Transactional
public class AuthService {

    private final AppUserRepository userRepository;
    private final PharmacyRepository pharmacyRepository;

    public AuthService(AppUserRepository userRepository, PharmacyRepository pharmacyRepository) {
        this.userRepository = userRepository;
        this.pharmacyRepository = pharmacyRepository;
    }

    public AuthResponse login(AuthRequest request) {
        AppUser user = userRepository.findByUsername(request.getUsername().trim())
                .orElse(null);

        if (user == null) {
            return new AuthResponse(false, "Invalid username or password");
        }

        String hashedInput = hashPassword(request.getPassword().trim());
        // For demo seed accounts with plain passwords or hashed
        if (!user.getPasswordHash().equals(hashedInput) && !user.getPasswordHash().equals(request.getPassword().trim())) {
            return new AuthResponse(false, "Invalid username or password");
        }

        AuthResponse resp = new AuthResponse(true, "Login successful");
        resp.setToken(generateToken(user));
        resp.setUserId(user.getId());
        resp.setUsername(user.getUsername());
        resp.setFullName(user.getFullName());
        resp.setEmail(user.getEmail());
        resp.setRole(user.getRole());
        if (user.getPharmacy() != null) {
            resp.setPharmacyId(user.getPharmacy().getId());
            resp.setPharmacyName(user.getPharmacy().getName());
        }
        return resp;
    }

    public AuthResponse register(AuthRequest request) {
        String rawUsername = request.getUsername() != null ? request.getUsername().trim() : "";
        if (rawUsername.isEmpty()) {
            return new AuthResponse(false, "Username is required");
        }
        if (request.getPassword() == null || request.getPassword().trim().length() < 4) {
            return new AuthResponse(false, "Password must be at least 4 characters long");
        }

        if (userRepository.existsByUsername(rawUsername)) {
            return new AuthResponse(false, "Username '" + rawUsername + "' is already taken. Please choose another username.");
        }

        // Resilient email resolution
        String rawEmail = request.getEmail();
        String resolvedEmail;
        if (rawEmail != null && !rawEmail.trim().isEmpty()) {
            resolvedEmail = rawEmail.trim();
        } else if (rawUsername.contains("@")) {
            resolvedEmail = rawUsername;
        } else {
            String cleanUser = rawUsername.replaceAll("[^a-zA-Z0-9._-]", "");
            if (cleanUser.isEmpty()) cleanUser = "user" + System.currentTimeMillis();
            resolvedEmail = cleanUser + "@medkhoj.local";
        }

        if (userRepository.existsByEmail(resolvedEmail)) {
            return new AuthResponse(false, "Email '" + resolvedEmail + "' is already registered. Please sign in or use another email.");
        }

        String userPhone = (request.getPhone() != null && !request.getPhone().trim().isEmpty())
                ? request.getPhone().trim()
                : "+91 94222 00000";

        Pharmacy pharmacy = null;
        String role = (request.getRole() != null && request.getRole().equalsIgnoreCase("PHARMACY_OWNER"))
                ? "PHARMACY_OWNER" : "CUSTOMER";

        if ("PHARMACY_OWNER".equals(role)) {
            if (request.getPharmacyName() == null || request.getPharmacyName().trim().isEmpty()) {
                return new AuthResponse(false, "Pharmacy store name is required for pharmacy accounts");
            }
            if (request.getLicenseNumber() == null || request.getLicenseNumber().trim().isEmpty()) {
                return new AuthResponse(false, "Drug license number is required for pharmacy accounts");
            }
            String cleanLicense = request.getLicenseNumber().trim();
            if (pharmacyRepository.existsByLicenseNumber(cleanLicense)) {
                return new AuthResponse(false, "Drug license number '" + cleanLicense + "' is already registered by another pharmacy");
            }

            String storeAddress = (request.getAddressLine() != null && !request.getAddressLine().trim().isEmpty())
                    ? request.getAddressLine().trim()
                    : (request.getArea() != null && !request.getArea().trim().isEmpty() ? request.getArea().trim() : "Main Street");
            String storeArea = (request.getArea() != null && !request.getArea().trim().isEmpty())
                    ? request.getArea().trim()
                    : "Central";
            String storeCity = (request.getCity() != null && !request.getCity().trim().isEmpty())
                    ? request.getCity().trim()
                    : "Metro";
            String storePincode = (request.getPincode() != null && !request.getPincode().trim().isEmpty())
                    ? request.getPincode().trim()
                    : "400001";
            String storeHours = (request.getOpeningHours() != null && !request.getOpeningHours().trim().isEmpty())
                    ? request.getOpeningHours().trim()
                    : "08:30 AM - 10:30 PM";

            pharmacy = new Pharmacy(
                    request.getPharmacyName().trim(),
                    cleanLicense,
                    resolvedEmail,
                    userPhone,
                    storeAddress,
                    storeArea,
                    storeCity,
                    storePincode,
                    storeHours
            );
            pharmacy = pharmacyRepository.save(pharmacy);
        }

        AppUser newUser = new AppUser(
                rawUsername,
                hashPassword(request.getPassword().trim()),
                (request.getFullName() != null && !request.getFullName().trim().isEmpty())
                        ? request.getFullName().trim() : rawUsername,
                resolvedEmail,
                userPhone,
                role,
                pharmacy
        );

        AppUser savedUser = userRepository.save(newUser);

        AuthResponse resp = new AuthResponse(true, "Registration successful");
        resp.setToken(generateToken(savedUser));
        resp.setUserId(savedUser.getId());
        resp.setUsername(savedUser.getUsername());
        resp.setFullName(savedUser.getFullName());
        resp.setEmail(savedUser.getEmail());
        resp.setRole(savedUser.getRole());
        if (savedUser.getPharmacy() != null) {
            resp.setPharmacyId(savedUser.getPharmacy().getId());
            resp.setPharmacyName(savedUser.getPharmacy().getName());
        }
        return resp;
    }

    public static String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            return password;
        }
    }

    private String generateToken(AppUser user) {
        return UUID.randomUUID().toString() + "-" + user.getId();
    }
}
