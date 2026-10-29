-- ========================================================
-- Medicine Availability Finder - PostgreSQL Sample Data
-- ========================================================

-- 1. Insert Sample Pharmacies in Chhatrapati Sambhajinagar
INSERT INTO pharmacy (name, license_number, email, phone, address_line, area, city, pincode, opening_hours, is_verified)
VALUES
('Apollo Pharmacy - Cannaught Place', 'MH-CSN-2023-00142', 'cidco@apollopharmacy.example.com', '+91 94222 12345', 'Cannaught Garden, Near CIDCO Bus Stand, CIDCO N-4', 'CIDCO (Cannaught Place)', 'Chhatrapati Sambhajinagar', '431003', '24 Hours', true),
('Sanjivani Medical & General Stores', 'MH-CSN-2022-00388', 'sanjivani@krantichowk.example.com', '+91 94222 23456', 'Station Road, Opp. Kranti Chowk Police Station', 'Kranti Chowk & Station Road', 'Chhatrapati Sambhajinagar', '431001', '07:30 AM - 11:30 PM', true),
('Wellness Forever 24x7 Chemist', 'MH-CSN-2024-00812', 'beedbypass@wellnessforever.example.com', '+91 94222 34567', 'Plot 12, Near Mitmita, Beed Bypass Road', 'Beed Bypass', 'Chhatrapati Sambhajinagar', '431010', '24 Hours', true),
('Mauli Day & Night Medical', 'MH-CSN-2023-00569', 'waluj@maulimedical.example.com', '+91 94222 45678', 'Sector X, Pandharpur Chowk, Waluj Industrial Area', 'Waluj MIDC', 'Chhatrapati Sambhajinagar', '431136', '08:00 AM - 11:00 PM', true),
('Shree Ganesh Chemist & Druggist', 'MH-CSN-2021-00721', 'garkheda@shreeganesh.example.com', '+91 94222 56789', 'Gajanan Maharaj Mandir Road, Garkheda Parisar', 'Garkheda Parisar', 'Chhatrapati Sambhajinagar', '431009', '08:30 AM - 10:30 PM', true),
('MedPlus Chemist - Samarth Nagar', 'MH-CSN-2024-00945', 'samarthnagar@medplus.example.com', '+91 94222 78901', 'Nirala Bazar Road, Near SB College, Samarth Nagar', 'Samarth Nagar & Nirala Bazar', 'Chhatrapati Sambhajinagar', '431001', '08:00 AM - 11:00 PM', true)
ON CONFLICT (license_number) DO NOTHING;

-- 2. Insert Sample Medicines
INSERT INTO medicine (brand_name, generic_name, manufacturer, category, dosage_form, strength, prescription_required, description)
VALUES
('Dolo 650', 'Paracetamol', 'Micro Labs Ltd', 'Analgesic / Antipyretic', 'Tablet', '650 mg', false, 'Commonly prescribed for relief of fever and mild to moderate pain.'),
('Calpol 500', 'Paracetamol', 'GlaxoSmithKline Pharmaceuticals Ltd', 'Analgesic / Antipyretic', 'Tablet', '500 mg', false, 'Gentle and effective pain and fever reducer.'),
('Crocin Advance', 'Paracetamol Fast Release', 'Haleon India', 'Analgesic / Antipyretic', 'Tablet', '500 mg', false, 'Fast absorbing paracetamol formulation for headache and fever.'),
('Augmentin 625 Duo', 'Amoxicillin + Potassium Clavulanate', 'GlaxoSmithKline Pharmaceuticals Ltd', 'Antibiotic', 'Tablet', '625 mg', true, 'Broad spectrum penicillin antibiotic for bacterial infections.'),
('Mox 500', 'Amoxicillin', 'Sun Pharmaceutical Industries', 'Antibiotic', 'Capsule', '500 mg', true, 'Antibacterial treatment for ear, throat, and respiratory infections.'),
('Azithral 500', 'Azithromycin', 'Alembic Pharmaceuticals Ltd', 'Antibiotic', 'Tablet', '500 mg', true, 'Macrolide antibiotic commonly used for respiratory tract infections.'),
('Allegra 120', 'Fexofenadine HCl', 'Sanofi India Ltd', 'Antihistamine / Allergy', 'Tablet', '120 mg', false, 'Non-drowsy allergy relief for hay fever and urticaria.'),
('Cetzine 10', 'Cetirizine Hydrochloride', 'Dr. Reddy''s Laboratories', 'Antihistamine / Allergy', 'Tablet', '10 mg', false, 'Effective relief from runny nose, sneezing, and itching allergies.'),
('Pan 40', 'Pantoprazole Sodium', 'Alkem Laboratories Ltd', 'Gastrointestinal / Antacid', 'Tablet', '40 mg', false, 'Proton pump inhibitor for acid reflux, heartburn, and GERD.'),
('Omez 20', 'Omeprazole', 'Dr. Reddy''s Laboratories', 'Gastrointestinal / Antacid', 'Capsule', '20 mg', false, 'Rapid relief from acidity and stomach gastric ulcers.'),
('Glycomet 500 SR', 'Metformin Hydrochloride (Sustained Release)', 'USV Private Limited', 'Antidiabetic', 'Tablet', '500 mg', true, 'First-line medication for type 2 diabetes blood glucose control.'),
('Telma 40', 'Telmisartan', 'Glenmark Pharmaceuticals Ltd', 'Cardiovascular / Antihypertensive', 'Tablet', '40 mg', true, 'Angiotensin receptor blocker for high blood pressure management.'),
('Ascoril LS Syrup', 'Levosalbutamol + Ambroxol + Guaifenesin', 'Glenmark Pharmaceuticals Ltd', 'Respiratory / Cough', 'Syrup', '100 ml', true, 'Expectorant and bronchodilator for wet cough and chest congestion.'),
('Becosules Z', 'B-Complex Vitamins with Vitamin C & Zinc', 'Pfizer Limited', 'Vitamins & Supplements', 'Capsule', 'Standard Dose', false, 'Nutritional supplement to boost immunity and energy.'),
('Shelcal 500', 'Calcium + Vitamin D3', 'Torrent Pharmaceuticals Ltd', 'Vitamins & Minerals', 'Tablet', '500 mg + 250 IU', false, 'Calcium supplement for bone health and osteoporosis prevention.')
ON CONFLICT DO NOTHING;

-- 3. Insert Pharmacy Listings (Stock Status, Quantities & Prices)
-- Link listings using subqueries on license numbers & brand names
INSERT INTO medicine_listing (pharmacy_id, medicine_id, stock_status, available_quantity, unit_price, discount_percent, batch_number, expiry_date, notes)
SELECT p.id, m.id, 'IN_STOCK', 120, 32.50, 5.0, 'DL65-24A', '2027-08-31', 'Fresh stock available over the counter.'
FROM pharmacy p, medicine m
WHERE p.license_number = 'MH-CSN-2023-00142' AND m.brand_name = 'Dolo 650'
ON CONFLICT (pharmacy_id, medicine_id) DO NOTHING;

INSERT INTO medicine_listing (pharmacy_id, medicine_id, stock_status, available_quantity, unit_price, discount_percent, batch_number, expiry_date, notes)
SELECT p.id, m.id, 'IN_STOCK', 85, 201.00, 10.0, 'AUG-24X', '2026-12-31', 'Prescription required at counter.'
FROM pharmacy p, medicine m
WHERE p.license_number = 'MH-CSN-2023-00142' AND m.brand_name = 'Augmentin 625 Duo'
ON CONFLICT (pharmacy_id, medicine_id) DO NOTHING;

INSERT INTO medicine_listing (pharmacy_id, medicine_id, stock_status, available_quantity, unit_price, discount_percent, batch_number, expiry_date, notes)
SELECT p.id, m.id, 'LOW_STOCK', 8, 118.50, 0.0, 'AZI-24Q', '2026-11-30', 'Only 8 packs remaining in store.'
FROM pharmacy p, medicine m
WHERE p.license_number = 'MH-CSN-2023-00142' AND m.brand_name = 'Azithral 500'
ON CONFLICT (pharmacy_id, medicine_id) DO NOTHING;

INSERT INTO medicine_listing (pharmacy_id, medicine_id, stock_status, available_quantity, unit_price, discount_percent, batch_number, expiry_date, notes)
SELECT p.id, m.id, 'IN_STOCK', 140, 18.25, 0.0, 'CAL-24K', '2027-06-30', 'Standard pack of 15 tablets at Kranti Chowk.'
FROM pharmacy p, medicine m
WHERE p.license_number = 'MH-CSN-2022-00388' AND m.brand_name = 'Calpol 500'
ON CONFLICT (pharmacy_id, medicine_id) DO NOTHING;

INSERT INTO medicine_listing (pharmacy_id, medicine_id, stock_status, available_quantity, unit_price, discount_percent, batch_number, expiry_date, notes)
SELECT p.id, m.id, 'IN_STOCK', 60, 195.00, 12.0, 'AUG-24P', '2027-01-31', 'Valid Rx needed.'
FROM pharmacy p, medicine m
WHERE p.license_number = 'MH-CSN-2022-00388' AND m.brand_name = 'Augmentin 625 Duo'
ON CONFLICT (pharmacy_id, medicine_id) DO NOTHING;

INSERT INTO medicine_listing (pharmacy_id, medicine_id, stock_status, available_quantity, unit_price, discount_percent, batch_number, expiry_date, notes)
SELECT p.id, m.id, 'OUT_OF_STOCK', 0, 168.00, 5.0, 'ALLG-23M', '2026-10-31', 'Expected replenishment by evening.'
FROM pharmacy p, medicine m
WHERE p.license_number = 'MH-CSN-2022-00388' AND m.brand_name = 'Allegra 120'
ON CONFLICT (pharmacy_id, medicine_id) DO NOTHING;

INSERT INTO medicine_listing (pharmacy_id, medicine_id, stock_status, available_quantity, unit_price, discount_percent, batch_number, expiry_date, notes)
SELECT p.id, m.id, 'IN_STOCK', 200, 31.00, 5.0, 'DOLO-99', '2027-09-30', '24/7 store open on Beed Bypass.'
FROM pharmacy p, medicine m
WHERE p.license_number = 'MH-CSN-2024-00812' AND m.brand_name = 'Dolo 650'
ON CONFLICT (pharmacy_id, medicine_id) DO NOTHING;

INSERT INTO medicine_listing (pharmacy_id, medicine_id, stock_status, available_quantity, unit_price, discount_percent, batch_number, expiry_date, notes)
SELECT p.id, m.id, 'IN_STOCK', 45, 145.00, 8.0, 'PAN4-24J', '2027-04-30', 'Strip of 15 tablets.'
FROM pharmacy p, medicine m
WHERE p.license_number = 'MH-CSN-2024-00812' AND m.brand_name = 'Pan 40'
ON CONFLICT (pharmacy_id, medicine_id) DO NOTHING;

INSERT INTO medicine_listing (pharmacy_id, medicine_id, stock_status, available_quantity, unit_price, discount_percent, batch_number, expiry_date, notes)
SELECT p.id, m.id, 'IN_STOCK', 90, 48.00, 5.0, 'GLY-24Z', '2027-05-31', 'Strip of 20 tablets at Waluj.'
FROM pharmacy p, medicine m
WHERE p.license_number = 'MH-CSN-2023-00569' AND m.brand_name = 'Glycomet 500 SR'
ON CONFLICT (pharmacy_id, medicine_id) DO NOTHING;

INSERT INTO medicine_listing (pharmacy_id, medicine_id, stock_status, available_quantity, unit_price, discount_percent, batch_number, expiry_date, notes)
SELECT p.id, m.id, 'IN_STOCK', 110, 115.00, 7.0, 'TEL-24B', '2027-03-31', 'Doctor prescription required.'
FROM pharmacy p, medicine m
WHERE p.license_number = 'MH-CSN-2023-00569' AND m.brand_name = 'Telma 40'
ON CONFLICT (pharmacy_id, medicine_id) DO NOTHING;

INSERT INTO medicine_listing (pharmacy_id, medicine_id, stock_status, available_quantity, unit_price, discount_percent, batch_number, expiry_date, notes)
SELECT p.id, m.id, 'IN_STOCK', 50, 112.00, 0.0, 'ASC-24C', '2026-11-30', '100ml syrup bottle.'
FROM pharmacy p, medicine m
WHERE p.license_number = 'MH-CSN-2021-00721' AND m.brand_name = 'Ascoril LS Syrup'
ON CONFLICT (pharmacy_id, medicine_id) DO NOTHING;

INSERT INTO medicine_listing (pharmacy_id, medicine_id, stock_status, available_quantity, unit_price, discount_percent, batch_number, expiry_date, notes)
SELECT p.id, m.id, 'IN_STOCK', 150, 45.00, 0.0, 'BEC-24W', '2027-12-31', '30 capsules pack.'
FROM pharmacy p, medicine m
WHERE p.license_number = 'MH-CSN-2021-00721' AND m.brand_name = 'Becosules Z'
ON CONFLICT (pharmacy_id, medicine_id) DO NOTHING;

INSERT INTO medicine_listing (pharmacy_id, medicine_id, stock_status, available_quantity, unit_price, discount_percent, batch_number, expiry_date, notes)
SELECT p.id, m.id, 'LOW_STOCK', 5, 29.50, 0.0, 'CROC-24N', '2027-03-31', 'Fast release Paracetamol at Nirala Bazar.'
FROM pharmacy p, medicine m
WHERE p.license_number = 'MH-CSN-2024-00945' AND m.brand_name = 'Crocin Advance'
ON CONFLICT (pharmacy_id, medicine_id) DO NOTHING;

-- 4. Insert Default Users (Customer & Pharmacy Owner)
INSERT INTO app_user (username, password_hash, full_name, email, phone, role, pharmacy_id)
VALUES
('customer_demo', 'customer123', 'Rahul Sharma', 'rahul.csn@example.com', '+91 94222 99887', 'CUSTOMER', NULL),
('rahul_sharma', 'demo123', 'Rahul Sharma', 'rahul.sharma@example.com', '+91 94222 99887', 'CUSTOMER', NULL),
('shree_ganesh_chem', 'demo123', 'Shree Ganesh Chemist', 'garkheda@shreeganesh.example.com', '+91 94222 56789', 'PHARMACY_OWNER', 5),
('apollo_cidco', 'pharmacy123', 'Dr. Anand Deshmukh', 'cidco@apollopharmacy.example.com', '+91 94222 12345', 'PHARMACY_OWNER', 1),
('sanjivani_kranti', 'pharmacy123', 'Sachin Patil', 'sanjivani@krantichowk.example.com', '+91 94222 23456', 'PHARMACY_OWNER', 2),
('wellness_bypass', 'pharmacy123', 'Pooja Kulkarni', 'beedbypass@wellnessforever.example.com', '+91 94222 34567', 'PHARMACY_OWNER', 3)
ON CONFLICT (username) DO NOTHING;

