# 💊 MedKhoj — Real-Time Medicine Availability Finder
> **A web-based system for finding medicine availability across nearby pharmacies & verified chemists**  
> *7th Semester Engineering Capstone Project*

---

## 🌟 Executive Summary

**MedKhoj** (मेडखोज / Medicine Discovery) is a modern full-stack healthcare web application that empowers citizens, patients, and families to search for real-time, pharmacy-reported medicine availability by brand or generic chemical name, filtered by locality or postal code (PIN).

### What MedKhoj Solves:
Unlike calling multiple chemists or travelling during emergencies, MedKhoj gives people immediate answers:
- **Medicine Discovery**: Brand & generic chemical search, dosage strengths (e.g. 500 mg, 650 mg), dosage forms (Tablet, Syrup, Capsule), prescription requirements (Rx vs OTC).
- **Live Stock Status**: Color-coded stock badges (**In Stock**, **Low Stock**, **Out of Stock**) with timestamps of when the chemist last updated their shelf.
- **Fair Transparent Pricing**: MRP, chemist discounts, and effective price.
- **Hold / Reservation Request**: 1-click modal to submit a hold request so the chemist keeps the medicine ready before arrival.
- **Chemist Partner Portal**: Dedicated portal for licensed pharmacies everywhere to maintain medicine listings, toggle stock in 1 click, and manage customer hold requests.

---

## 🎨 Branding & Logo

- **Brand Name**: **MedKhoj** (`Med` for Medical Care + `Khoj` for Instant Discovery).
- **Logo Emblem**: A modern emerald-cyan gradient medical cross merged with an integrated search discovery lens.
- **Status Indicator**: `LIVE CHEMIST NETWORK` active indicator badge.

---

## 🛠️ Architecture & Tech Stack

```
   ┌────────────────────────────────────────────────────────────┐
   │                     React 19 + Vite 8                      │
   │  (Dark Glassmorphism, Micro-Animations, Lucide React)      │
   └─────────────────────────────┬──────────────────────────────┘
                                 │ REST API (JSON)
                                 ▼
   ┌────────────────────────────────────────────────────────────┐
   │             Java 25 + Spring Boot 3.5.3 REST API           │
   │   (Spring Data JPA, Hibernate ORM, Validation, WebMVC)     │
   └─────────────────────────────┬──────────────────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
   ┌───────────────────────────┐   ┌────────────────────────────┐
   │   PostgreSQL 18 Database  │   │     H2 In-Memory Database  │
   │    (Production Profile)   │   │   (Zero-Config Dev Mode)   │
   └───────────────────────────┘   └────────────────────────────┘
```

- **Frontend**: React 19, Vite 8, Vanilla CSS design tokens, Lucide React icons.
- **Backend**: Java 25 (LTS), Spring Boot 3.5.3, Spring Data JPA, Hibernate, Jakarta Validation.
- **Database**: 
  - **Embedded H2 (Default dev profile)**: Zero-config preview, auto-seeds realistic Chhatrapati Sambhajinagar demo pharmacies, medicines, listings, and accounts on startup.
  - **PostgreSQL 18 (Production profile)**: Schema DDL, triggers, and indexes ready for production scaling.

---

## 📁 Project Structure

```
c:\My7thSem Project\
├── backend/                              # Spring Boot REST API
│   ├── pom.xml                           # Maven dependencies (Java 25, Boot 3.5.3)
│   ├── src/main/java/com/medicinefinder/
│   │   ├── MedicineAvailabilityFinderApplication.java
│   │   ├── config/                       # DataInitializer (CSN seed data), CorsConfig
│   │   ├── controller/                   # REST Endpoints (Search, Pharmacy, Enquiry, Auth)
│   │   ├── dto/                          # Clean Request/Response objects
│   │   ├── model/                        # JPA Entities (Pharmacy, Medicine, Listing, User, Enquiry)
│   │   ├── repository/                   # JPA Repositories with custom JPQL queries
│   │   └── service/                      # Business logic layer
│   └── src/main/resources/
│       ├── application.properties        # Master config (default profile: h2)
│       ├── application-h2.properties     # Embedded H2 in-memory config
│       └── application-postgres.properties # PostgreSQL production config
│
├── frontend/                             # React + Vite Web Client
│   ├── index.html                        # MedKhoj title, custom SVG cross+lens favicon
│   ├── package.json                      # React 19, Lucide React, Vite
│   ├── src/
│   │   ├── api/client.js                 # Centralized HTTP client
│   │   ├── context/AuthContext.jsx       # Auth & role state management
│   │   ├── components/
│   │   │   ├── Navbar.jsx                # MedKhoj logo, Sambhajinagar badge, role navigation
│   │   │   ├── SearchHero.jsx            # City search hero with area selector & quick tags
│   │   │   ├── FilterBar.jsx             # Stock status tabs, dosage form, sorting
│   │   │   ├── ListingCard.jsx           # Medicine card with real-time stock pulse
│   │   │   ├── PharmacyPortal.jsx        # Chemist inventory & enquiry dashboard
│   │   │   ├── AddListingModal.jsx       # Stock creation with catalog autocomplete
│   │   │   ├── EnquiryModal.jsx          # Customer reservation / inquiry popup
│   │   │   ├── AuthModal.jsx             # 1-Click demo accounts & registration
│   │   │   └── Footer.jsx                # Healthcare disclaimer & Sambhajinagar metadata
│   │   ├── App.jsx                       # Master view coordinator
│   │   └── index.css                     # Curated Dark Medical Glassmorphism Design
│
└── database/
    ├── schema-postgres.sql               # PostgreSQL 18 Schema DDL with search indexes
    ├── data-postgres.sql                 # Chhatrapati Sambhajinagar seed data
    └── README.md                         # PostgreSQL setup guide
```

---

## 🚀 Quick Start Guide

### 1. Launch Spring Boot Backend
Open a terminal in the `backend/` directory:
```powershell
cd backend
mvn spring-boot:run
```
> The backend boots on **`http://localhost:8080`**.  
> The embedded database automatically seeds 15 medicines, 6 Chhatrapati Sambhajinagar partner pharmacies, and 19 listings!  
> *(H2 Web Console available at `http://localhost:8080/h2-console` with JDBC URL `jdbc:h2:mem:medicinedb` and user `sa`).*

### 2. Launch React Frontend
In a second terminal:
```powershell
cd frontend
npm run dev
```
> Open your browser at **`http://localhost:5173`**.

---

## 🔐 Demo Accounts (1-Click Login in UI)

The application provides instant 1-click login buttons in the Sign In modal:

| Role | Username | Password | Pharmacy / Location |
|---|---|---|---|
| **Chemist / Pharmacy Partner** | `apollo_cidco` | `chemist123` | Apollo Pharmacy (Cannaught Place, CIDCO N-4) |
| **Chemist / Pharmacy Partner** | `sanjivani_kranti` | `chemist123` | Sanjivani Medical & General Stores (Kranti Chowk) |
| **Chemist / Pharmacy Partner** | `wellness_bypass` | `chemist123` | Wellness Forever 24x7 Chemist (Beed Bypass Road) |
| **Customer** | `customer_demo` | `demo123` | Karan (Chhatrapati Sambhajinagar resident) |

---

## 🔌 Core REST API Endpoints

### Public Customer Search
- `GET /api/search?query=Paracetamol&area=CIDCO (Cannaught Place)&stockStatus=IN_STOCK` - Multi-criteria search
- `GET /api/medicines?query=...` - Auto-suggest catalog search
- `GET /api/metadata` - Fetch available Chhatrapati Sambhajinagar areas, PIN codes, dosage forms, and categories

### Pharmacy Management
- `GET /api/pharmacy/{id}/listings` - Chemist's active inventory
- `POST /api/pharmacy/{id}/listings` - Add medicine listing with quantity & price
- `PATCH /api/pharmacy/{id}/listings/{listingId}` - 1-Click stock status & count update
- `DELETE /api/pharmacy/{id}/listings/{listingId}` - Remove listing
- `GET /api/pharmacy/{id}/stats` - Total, In-Stock, Low-Stock, Out-of-Stock counts
- `GET /api/pharmacy/{id}/profile` & `PUT` - Store profile & opening hours

### Customer Enquiries
- `POST /api/enquiries` - Submit medicine reservation / hold request
- `GET /api/enquiries/pharmacy/{id}` - Chemist views customer enquiries
- `PATCH /api/enquiries/{id}/status` - Update enquiry status (`CONFIRMED`, `FULFILLED`)

### Authentication
- `POST /api/auth/login` - Username/password authentication
- `POST /api/auth/register` - Customer signup or Chemist business onboarding

---

## 🗄️ Running with PostgreSQL 18

If you wish to switch from the embedded H2 database to your local PostgreSQL 18 instance:

1. Create database in PostgreSQL:
   ```sql
   CREATE DATABASE medicine_finder_db;
   ```
2. Run the SQL schema and data scripts located in `database/`:
   ```powershell
   & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d medicine_finder_db -f "database\schema-postgres.sql"
   & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d medicine_finder_db -f "database\data-postgres.sql"
   ```
3. Set your PostgreSQL password in your terminal environment and launch the `postgres` profile:
   ```powershell
   $env:DB_PASSWORD = "your_actual_password"
   mvn spring-boot:run -Dspring-boot.run.profiles=postgres
   ```
   *(Your password is kept secure in memory and is never hardcoded or committed).*
