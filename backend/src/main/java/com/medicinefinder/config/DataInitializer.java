package com.medicinefinder.config;

import com.medicinefinder.model.*;
import com.medicinefinder.repository.*;
import com.medicinefinder.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final PharmacyRepository pharmacyRepository;
    private final MedicineRepository medicineRepository;
    private final MedicineListingRepository listingRepository;
    private final AppUserRepository userRepository;

    public DataInitializer(PharmacyRepository pharmacyRepository,
                           MedicineRepository medicineRepository,
                           MedicineListingRepository listingRepository,
                           AppUserRepository userRepository) {
        this.pharmacyRepository = pharmacyRepository;
        this.medicineRepository = medicineRepository;
        this.listingRepository = listingRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        if (pharmacyRepository.count() > 0) {
            log.info("Database already seeded with pharmacies. Skipping auto-seed.");
            return;
        }

        log.info("Seeding initial pharmacies, medicines, listings and demo users...");

        // 1. Create Pharmacies in Chhatrapati Sambhajinagar
        Pharmacy p1 = new Pharmacy("Apollo Pharmacy - Cannaught Place", "MH-CSN-2023-00142", "cidco@apollopharmacy.example.com", "+91 94222 12345", "Cannaught Garden, Near CIDCO Bus Stand, CIDCO N-4", "CIDCO (Cannaught Place)", "Chhatrapati Sambhajinagar", "431003", "24 Hours");
        Pharmacy p2 = new Pharmacy("Sanjivani Medical & General Stores", "MH-CSN-2022-00388", "sanjivani@krantichowk.example.com", "+91 94222 23456", "Station Road, Opp. Kranti Chowk Police Station", "Kranti Chowk & Station Road", "Chhatrapati Sambhajinagar", "431001", "07:30 AM - 11:30 PM");
        Pharmacy p3 = new Pharmacy("Wellness Forever 24x7 Chemist", "MH-CSN-2024-00812", "beedbypass@wellnessforever.example.com", "+91 94222 34567", "Plot 12, Near Mitmita, Beed Bypass Road", "Beed Bypass", "Chhatrapati Sambhajinagar", "431010", "24 Hours");
        Pharmacy p4 = new Pharmacy("Mauli Day & Night Medical", "MH-CSN-2023-00569", "waluj@maulimedical.example.com", "+91 94222 45678", "Sector X, Pandharpur Chowk, Waluj Industrial Area", "Waluj MIDC", "Chhatrapati Sambhajinagar", "431136", "08:00 AM - 11:00 PM");
        Pharmacy p5 = new Pharmacy("Shree Ganesh Chemist & Druggist", "MH-CSN-2021-00721", "garkheda@shreeganesh.example.com", "+91 94222 56789", "Gajanan Maharaj Mandir Road, Garkheda Parisar", "Garkheda Parisar", "Chhatrapati Sambhajinagar", "431009", "08:30 AM - 10:30 PM");
        Pharmacy p6 = new Pharmacy("MedPlus Chemist - Samarth Nagar", "MH-CSN-2024-00945", "samarthnagar@medplus.example.com", "+91 94222 78901", "Nirala Bazar Road, Near SB College, Samarth Nagar", "Samarth Nagar & Nirala Bazar", "Chhatrapati Sambhajinagar", "431001", "08:00 AM - 11:00 PM");

        pharmacyRepository.saveAll(List.of(p1, p2, p3, p4, p5, p6));

        // 2. Create Medicines
        Medicine m1 = new Medicine("Dolo 650", "Paracetamol", "Micro Labs Ltd", "Analgesic / Antipyretic", "Tablet", "650 mg", false, "Commonly prescribed for relief of fever and mild to moderate pain.");
        Medicine m2 = new Medicine("Calpol 500", "Paracetamol", "GlaxoSmithKline Pharmaceuticals Ltd", "Analgesic / Antipyretic", "Tablet", "500 mg", false, "Gentle and effective pain and fever reducer.");
        Medicine m3 = new Medicine("Crocin Advance", "Paracetamol Fast Release", "Haleon India", "Analgesic / Antipyretic", "Tablet", "500 mg", false, "Fast absorbing paracetamol formulation for headache and fever.");
        Medicine m4 = new Medicine("Augmentin 625 Duo", "Amoxicillin + Potassium Clavulanate", "GlaxoSmithKline Pharmaceuticals Ltd", "Antibiotic", "Tablet", "625 mg", true, "Broad spectrum penicillin antibiotic for bacterial infections.");
        Medicine m5 = new Medicine("Mox 500", "Amoxicillin", "Sun Pharmaceutical Industries", "Antibiotic", "Capsule", "500 mg", true, "Antibacterial treatment for ear, throat, and respiratory infections.");
        Medicine m6 = new Medicine("Azithral 500", "Azithromycin", "Alembic Pharmaceuticals Ltd", "Antibiotic", "Tablet", "500 mg", true, "Macrolide antibiotic commonly used for respiratory tract infections.");
        Medicine m7 = new Medicine("Allegra 120", "Fexofenadine HCl", "Sanofi India Ltd", "Antihistamine / Allergy", "Tablet", "120 mg", false, "Non-drowsy allergy relief for hay fever and urticaria.");
        Medicine m8 = new Medicine("Cetzine 10", "Cetirizine Hydrochloride", "Dr. Reddy's Laboratories", "Antihistamine / Allergy", "Tablet", "10 mg", false, "Effective relief from runny nose, sneezing, and itching allergies.");
        Medicine m9 = new Medicine("Pan 40", "Pantoprazole Sodium", "Alkem Laboratories Ltd", "Gastrointestinal / Antacid", "Tablet", "40 mg", false, "Proton pump inhibitor for acid reflux, heartburn, and GERD.");
        Medicine m10 = new Medicine("Omez 20", "Omeprazole", "Dr. Reddy's Laboratories", "Gastrointestinal / Antacid", "Capsule", "20 mg", false, "Rapid relief from acidity and stomach gastric ulcers.");
        Medicine m11 = new Medicine("Glycomet 500 SR", "Metformin Hydrochloride", "USV Private Limited", "Antidiabetic", "Tablet", "500 mg", true, "First-line medication for type 2 diabetes blood glucose control.");
        Medicine m12 = new Medicine("Telma 40", "Telmisartan", "Glenmark Pharmaceuticals Ltd", "Cardiovascular / Antihypertensive", "Tablet", "40 mg", true, "Angiotensin receptor blocker for high blood pressure management.");
        Medicine m13 = new Medicine("Ascoril LS Syrup", "Levosalbutamol + Ambroxol + Guaifenesin", "Glenmark Pharmaceuticals Ltd", "Respiratory / Cough", "Syrup", "100 ml", true, "Expectorant and bronchodilator for wet cough and chest congestion.");
        Medicine m14 = new Medicine("Becosules Z", "B-Complex Vitamins with Vitamin C & Zinc", "Pfizer Limited", "Vitamins & Supplements", "Capsule", "Standard Dose", false, "Nutritional supplement to boost immunity and energy.");
        Medicine m15 = new Medicine("Shelcal 500", "Calcium + Vitamin D3", "Torrent Pharmaceuticals Ltd", "Vitamins & Minerals", "Tablet", "500 mg + 250 IU", false, "Calcium supplement for bone health and osteoporosis prevention.");

        medicineRepository.saveAll(List.of(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15));

        // 3. Create Medicine Listings for Chhatrapati Sambhajinagar Pharmacies
        MedicineListing l1 = new MedicineListing(p1, m1, StockStatus.IN_STOCK, 120, new BigDecimal("32.50"), new BigDecimal("5.0"), "DL65-24A", LocalDate.now().plusMonths(24), "Fresh batch available at Cannaught Place counter.");
        MedicineListing l2 = new MedicineListing(p1, m4, StockStatus.IN_STOCK, 85, new BigDecimal("201.00"), new BigDecimal("10.0"), "AUG-24X", LocalDate.now().plusMonths(18), "Valid doctor prescription required.");
        MedicineListing l3 = new MedicineListing(p1, m6, StockStatus.LOW_STOCK, 6, new BigDecimal("118.50"), BigDecimal.ZERO, "AZI-24Q", LocalDate.now().plusMonths(14), "Only 6 strips remaining in CIDCO branch.");
        MedicineListing l4 = new MedicineListing(p1, m7, StockStatus.IN_STOCK, 75, new BigDecimal("185.00"), new BigDecimal("5.0"), "ALG-24D", LocalDate.now().plusMonths(20), "Over the counter allergy relief.");

        MedicineListing l5 = new MedicineListing(p2, m2, StockStatus.IN_STOCK, 140, new BigDecimal("18.25"), BigDecimal.ZERO, "CAL-24K", LocalDate.now().plusMonths(22), "Standard strip of 15 tablets at Kranti Chowk.");
        MedicineListing l6 = new MedicineListing(p2, m4, StockStatus.IN_STOCK, 55, new BigDecimal("195.00"), new BigDecimal("12.0"), "AUG-24P", LocalDate.now().plusMonths(16), "Valid prescription needed.");
        MedicineListing l7 = new MedicineListing(p2, m7, StockStatus.OUT_OF_STOCK, 0, new BigDecimal("168.00"), new BigDecimal("5.0"), "ALLG-23M", LocalDate.now().plusMonths(10), "Restock expected by evening.");
        MedicineListing l8 = new MedicineListing(p2, m8, StockStatus.IN_STOCK, 95, new BigDecimal("22.00"), BigDecimal.ZERO, "CET-24V", LocalDate.now().plusMonths(24), "Allergy relief strip of 10.");

        MedicineListing l9 = new MedicineListing(p3, m1, StockStatus.IN_STOCK, 200, new BigDecimal("31.00"), new BigDecimal("5.0"), "DOLO-99", LocalDate.now().plusMonths(26), "24/7 store open on Beed Bypass.");
        MedicineListing l10 = new MedicineListing(p3, m9, StockStatus.IN_STOCK, 45, new BigDecimal("145.00"), new BigDecimal("8.0"), "PAN4-24J", LocalDate.now().plusMonths(20), "Acidity and heartburn relief.");
        MedicineListing l11 = new MedicineListing(p3, m13, StockStatus.IN_STOCK, 30, new BigDecimal("115.00"), BigDecimal.ZERO, "ASC-24R", LocalDate.now().plusMonths(15), "100ml cough syrup.");

        MedicineListing l12 = new MedicineListing(p4, m11, StockStatus.IN_STOCK, 90, new BigDecimal("48.00"), new BigDecimal("5.0"), "GLY-24Z", LocalDate.now().plusMonths(24), "Diabetic management strip of 20 at Waluj.");
        MedicineListing l13 = new MedicineListing(p4, m12, StockStatus.IN_STOCK, 110, new BigDecimal("115.00"), new BigDecimal("7.0"), "TEL-24B", LocalDate.now().plusMonths(18), "Blood pressure tablet.");
        MedicineListing l14 = new MedicineListing(p4, m2, StockStatus.LOW_STOCK, 4, new BigDecimal("19.00"), BigDecimal.ZERO, "CAL-24L", LocalDate.now().plusMonths(12), "Running low on Calpol 500.");

        MedicineListing l15 = new MedicineListing(p5, m13, StockStatus.IN_STOCK, 50, new BigDecimal("112.00"), BigDecimal.ZERO, "ASC-24C", LocalDate.now().plusMonths(16), "Store open in Garkheda near Gajanan Mandir.");
        MedicineListing l16 = new MedicineListing(p5, m14, StockStatus.IN_STOCK, 150, new BigDecimal("45.00"), BigDecimal.ZERO, "BEC-24W", LocalDate.now().plusMonths(30), "Vitamin B-Complex + Zinc.");
        MedicineListing l17 = new MedicineListing(p5, m1, StockStatus.IN_STOCK, 160, new BigDecimal("32.00"), new BigDecimal("4.0"), "DOL-24S", LocalDate.now().plusMonths(22), "Always available.");
        MedicineListing l18 = new MedicineListing(p5, m4, StockStatus.IN_STOCK, 45, new BigDecimal("198.00"), new BigDecimal("8.0"), "AUG-24G", LocalDate.now().plusMonths(18), "Valid doctor prescription required.");
        MedicineListing l19 = new MedicineListing(p5, m9, StockStatus.IN_STOCK, 80, new BigDecimal("142.00"), new BigDecimal("5.0"), "PAN-24G", LocalDate.now().plusMonths(22), "Pan 40 strips in stock.");
        MedicineListing l20 = new MedicineListing(p5, m7, StockStatus.IN_STOCK, 60, new BigDecimal("180.00"), BigDecimal.ZERO, "ALG-24G", LocalDate.now().plusMonths(20), "Allegra 120 allergy tablets.");
        MedicineListing l21 = new MedicineListing(p5, m15, StockStatus.LOW_STOCK, 8, new BigDecimal("125.00"), new BigDecimal("5.0"), "SHL-24G", LocalDate.now().plusMonths(24), "Shelcal 500 Calcium tablets.");

        MedicineListing l22 = new MedicineListing(p6, m3, StockStatus.LOW_STOCK, 5, new BigDecimal("29.50"), BigDecimal.ZERO, "CROC-24N", LocalDate.now().plusMonths(14), "Fast release paracetamol at Nirala Bazar.");
        MedicineListing l23 = new MedicineListing(p6, m15, StockStatus.IN_STOCK, 80, new BigDecimal("128.00"), new BigDecimal("10.0"), "SHEL-24M", LocalDate.now().plusMonths(24), "Calcium and Vitamin D3.");

        listingRepository.saveAll(List.of(l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20, l21, l22, l23));

        // 4. Create Demo Users
        AppUser customer = new AppUser("customer_demo", AuthService.hashPassword("customer123"), "Rahul Sharma", "rahul.csn@example.com", "+91 94222 99887", "CUSTOMER", null);
        AppUser rahulSharma = new AppUser("rahul_sharma", AuthService.hashPassword("demo123"), "Rahul Sharma", "rahul.sharma@example.com", "+91 94222 99887", "CUSTOMER", null);
        AppUser shreeGanesh = new AppUser("shree_ganesh_chem", AuthService.hashPassword("demo123"), "Shree Ganesh Chemist", "garkheda@shreeganesh.example.com", "+91 94222 56789", "PHARMACY_OWNER", p5);
        AppUser apolloCidco = new AppUser("apollo_cidco", AuthService.hashPassword("pharmacy123"), "Dr. Anand Deshmukh", "cidco@apollopharmacy.example.com", "+91 94222 12345", "PHARMACY_OWNER", p1);
        AppUser sanjivaniOwner = new AppUser("sanjivani_kranti", AuthService.hashPassword("pharmacy123"), "Sachin Patil", "sanjivani@krantichowk.example.com", "+91 94222 23456", "PHARMACY_OWNER", p2);
        AppUser wellnessOwner = new AppUser("wellness_bypass", AuthService.hashPassword("pharmacy123"), "Pooja Kulkarni", "beedbypass@wellnessforever.example.com", "+91 94222 34567", "PHARMACY_OWNER", p3);

        userRepository.saveAll(List.of(customer, rahulSharma, shreeGanesh, apolloCidco, sanjivaniOwner, wellnessOwner));

        log.info("Database seeding successfully completed with {} medicines and {} pharmacy listings!",
                medicineRepository.count(), listingRepository.count());
    }
}

