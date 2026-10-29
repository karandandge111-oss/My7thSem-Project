# MedKhoj Backend (Spring Boot 3.5.3 + Java 25)

REST API backend for the **MedKhoj — Real-Time Medicine Availability Finder** system.

## 🚀 Deployment Guide
Full production deployment guide with step-by-step instructions for **Render.com**, **Railway.app**, and **Docker/VPS** is available at:
👉 **[BACKEND_DEPLOYMENT.md](../BACKEND_DEPLOYMENT.md)**

## 💻 Local Development

### 1. In-Memory H2 Mode (Zero Config)
```bash
./mvnw clean spring-boot:run
```
API runs on `http://localhost:8080` with H2 console at `http://localhost:8080/h2-console`.

### 2. Local PostgreSQL Mode
```bash
$env:DB_NAME="medicine_finder_db"
$env:DB_USER="postgres"
$env:DB_PASSWORD="your_password"
./mvnw spring-boot:run -Dspring-boot.run.profiles=postgres
```

## 🐳 Docker Build
```bash
docker build -t medkhoj-backend .
docker run -p 8080:8080 medkhoj-backend
```

