-- ========================================================
-- Medicine Availability Finder - PostgreSQL Schema DDL
-- Compatible with PostgreSQL 12+ / 18
-- ========================================================

CREATE TABLE IF NOT EXISTS pharmacy (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    license_number VARCHAR(80) UNIQUE NOT NULL,
    email VARCHAR(120),
    phone VARCHAR(30) NOT NULL,
    address_line VARCHAR(255) NOT NULL,
    area VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    opening_hours VARCHAR(100),
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medicine (
    id BIGSERIAL PRIMARY KEY,
    brand_name VARCHAR(150) NOT NULL,
    generic_name VARCHAR(150) NOT NULL,
    manufacturer VARCHAR(150),
    category VARCHAR(80),
    dosage_form VARCHAR(50) NOT NULL,
    strength VARCHAR(50) NOT NULL,
    prescription_required BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medicine_listing (
    id BIGSERIAL PRIMARY KEY,
    pharmacy_id BIGINT NOT NULL REFERENCES pharmacy(id) ON DELETE CASCADE,
    medicine_id BIGINT NOT NULL REFERENCES medicine(id) ON DELETE CASCADE,
    stock_status VARCHAR(30) NOT NULL DEFAULT 'IN_STOCK', -- IN_STOCK, LOW_STOCK, OUT_OF_STOCK
    available_quantity INTEGER DEFAULT 0,
    unit_price NUMERIC(10, 2),
    discount_percent NUMERIC(5, 2) DEFAULT 0.0,
    batch_number VARCHAR(60),
    expiry_date DATE,
    notes VARCHAR(255),
    last_reported_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_pharmacy_medicine UNIQUE (pharmacy_id, medicine_id)
);

CREATE TABLE IF NOT EXISTS app_user (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    phone VARCHAR(30),
    role VARCHAR(30) NOT NULL DEFAULT 'CUSTOMER', -- CUSTOMER, PHARMACY_OWNER, ADMIN
    pharmacy_id BIGINT REFERENCES pharmacy(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enquiry (
    id BIGSERIAL PRIMARY KEY,
    customer_name VARCHAR(120) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    customer_email VARCHAR(120),
    pharmacy_id BIGINT NOT NULL REFERENCES pharmacy(id) ON DELETE CASCADE,
    medicine_listing_id BIGINT REFERENCES medicine_listing(id) ON DELETE SET NULL,
    medicine_name VARCHAR(150) NOT NULL,
    requested_quantity INTEGER DEFAULT 1,
    notes TEXT,
    status VARCHAR(30) DEFAULT 'PENDING', -- PENDING, CONFIRMED, CANCELLED, FULFILLED
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Search Performance Indexes
CREATE INDEX IF NOT EXISTS idx_medicine_brand_name ON medicine (LOWER(brand_name));
CREATE INDEX IF NOT EXISTS idx_medicine_generic_name ON medicine (LOWER(generic_name));
CREATE INDEX IF NOT EXISTS idx_medicine_category ON medicine (category);
CREATE INDEX IF NOT EXISTS idx_pharmacy_area ON pharmacy (LOWER(area));
CREATE INDEX IF NOT EXISTS idx_pharmacy_pincode ON pharmacy (pincode);
CREATE INDEX IF NOT EXISTS idx_listing_stock_status ON medicine_listing (stock_status);
CREATE INDEX IF NOT EXISTS idx_listing_pharmacy ON medicine_listing (pharmacy_id);
CREATE INDEX IF NOT EXISTS idx_listing_medicine ON medicine_listing (medicine_id);
