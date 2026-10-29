# ========================================================
# MedKhoj Backend - Production Multi-Stage Dockerfile
# Compatible with Render, Railway, Fly.io, AWS, and VPS
# Uses Eclipse Temurin Java 25 (Adoptium LTS)
# ========================================================

# Stage 1: Build the Application
FROM eclipse-temurin:25-jdk AS builder
WORKDIR /app

# Copy Maven wrapper & pom.xml for dependency caching
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw

# Pre-fetch project dependencies to leverage Docker layer cache
RUN ./mvnw dependency:go-offline -B || true

# Copy source code and build production jar
COPY src/ ./src/
RUN ./mvnw clean package -DskipTests

# Stage 2: Minimal Runtime Image
FROM eclipse-temurin:25-jre
WORKDIR /app

# Run as non-root user for security
RUN groupadd -r spring && useradd -r -g spring spring
USER spring:spring

# Copy built JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Dynamic port (Render & Railway inject $PORT at runtime, default to 8080)
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar app.jar"]

