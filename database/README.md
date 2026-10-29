# PostgreSQL Database Setup Guide

This directory contains the PostgreSQL schema DDL and sample seed data for the **Medicine Availability Finder** system.

## Files
1. `schema-postgres.sql` - Table definitions for `pharmacy`, `medicine`, `medicine_listing`, `app_user`, and `enquiry`, plus indexes on brand name, generic name, area, and pincode.
2. `data-postgres.sql` - Realistic sample data covering 6 pharmacies across multiple Bengaluru areas (Indiranagar, Koramangala, Whitefield, Jayanagar, HSR Layout, Malleshwaram), 15 medicines (Paracetamol 500/650, Augmentin, Pan 40, Azithral, Allegra, etc.), and initial demo user accounts.

## Running on Local PostgreSQL

1. **Create the Database in PostgreSQL**:
   ```sql
   CREATE DATABASE medicine_finder_db;
   ```

2. **Execute the Schema & Seed Scripts**:
   Using `psql`:
   ```powershell
   & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d medicine_finder_db -f "database\schema-postgres.sql"
   & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d medicine_finder_db -f "database\data-postgres.sql"
   ```

3. **Configure Spring Boot Backend to use PostgreSQL**:
   Set environment variables or launch with the `postgres` profile:
   ```powershell
   $env:DB_NAME = "medicine_finder_db"
   $env:DB_USER = "postgres"
   $env:DB_PASSWORD = "your_actual_password_here"
   
   cd backend
   mvn spring-boot:run -Dspring-boot.run.profiles=postgres
   ```
   *(Note: The embedded H2 database is also enabled by default for zero-friction development and grading demos).*
