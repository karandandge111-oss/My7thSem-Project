# 🚀 MedKhoj Backend Deployment Guide
> **Step-by-step guide to deploy the Java 25 & Spring Boot 3.5.3 REST API with zero issues.**

---

## 📋 Overview & Recommended Choices

| Hosting Platform | Cost | Setup Time | Database | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **Render.com (Recommended)** | **Free** | 5 mins | Render PostgreSQL / Neon / H2 | College Projects, Final Viva, Production Demo |
| **Railway.app** | Free Trial Credits | 3 mins | Built-in 1-Click PostgreSQL | Quickest setup, high performance |
| **Any Linux VPS / Cloud VM** | \$4-\$6/mo or Free Tier | 10 mins | Dockerized PostgreSQL | AWS EC2, DigitalOcean, Oracle Cloud |

---

## 🌟 What We Have Prepared For You

To ensure your deployment is **100% error-free**, the following fixes and files are already prepared:
1. **`backend/Dockerfile`**: A multi-stage Docker build using `eclipse-temurin:25-jdk` and `eclipse-temurin:25-jre`. This prevents the common error where cloud buildpacks only support Java 17/21.
2. **Dynamic Port Binding**: `application.properties` is configured to listen to `server.port=${PORT:8080}`, so Render/Railway dynamic port assignment works instantly.
3. **CORS Config**: `CorsConfig.java` is already configured to accept requests from any frontend URL (e.g. Vercel, Netlify, or local).
4. **Auto Database Seeding**: `DataInitializer.java` automatically initializes all 6 Chhatrapati Sambhajinagar pharmacies, 15 medicines, and demo chemist logins on first launch if the database is empty.

---

## 🥇 Method 1: Deploy on Render.com (Recommended — 100% Free)

Render is the most reliable free platform for student capstone projects.

### Step 1: Push your latest code to GitHub
Make sure your project repository is pushed to GitHub:
```bash
git add .
git commit -m "Add Dockerfile and deployment configurations"
git push origin main
```

---

### Step 2: Create a Free PostgreSQL Database on Render
*(If you want to test with zero database setup first, skip to Step 3 and use H2 mode).*

1. Log in to [Render.com](https://render.com).
2. Click **New +** in the top navigation and select **PostgreSQL**.
3. Fill in the details:
   - **Name**: `medkhoj-db`
   - **Database**: `medicine_finder_db`
   - **User**: `postgres`
   - **Region**: Choose the region closest to you (e.g., `Singapore` or `Frankfurt`).
   - **Instance Type**: **Free**
4. Click **Create Database**.
5. Once created, keep this page open. You will need:
   - **Internal Database URL** (if backend is on the same Render region) OR
   - **External Database URL** (e.g., `postgresql://postgres:password@host/medicine_finder_db`) or the individual Host, User, Password, and Database fields.

> [!TIP]
> You can also use a free cloud Postgres instance from [Neon.tech](https://neon.tech) or [Supabase](https://supabase.com). Both provide free, instant PostgreSQL databases.

---

### Step 3: Create the Web Service on Render

1. On the Render dashboard, click **New +** and select **Web Service**.
2. Connect your GitHub repository.
3. Configure the service settings:
   - **Name**: `medkhoj-backend` (or your preferred name)
   - **Region**: Same region as your database
   - **Branch**: `main`
   - **Root Directory**: `backend` *(CRITICAL: Type `backend` here so Render builds the backend folder)*
   - **Runtime**: **Docker** *(Render will automatically detect `backend/Dockerfile`)*
   - **Instance Type**: **Free**

---

### Step 4: Configure Environment Variables

Scroll down to the **Environment Variables** section and add the following keys:

#### Option A: Using PostgreSQL (Production Mode)
| Key | Value / Example | Notes |
| :--- | :--- | :--- |
| `SPRING_PROFILES_ACTIVE` | `postgres` | Activates PostgreSQL configuration |
| `DB_HOST` | *`your-db-host.render.com`* | From Render or Neon Postgres |
| `DB_PORT` | `5432` | Standard Postgres port |
| `DB_NAME` | `medicine_finder_db` | Your database name |
| `DB_USER` | `postgres` | Your database username |
| `DB_PASSWORD` | *`your_postgres_password`* | Your database password |
| `DB_SSL_MODE` | `require` | Required for cloud databases |

*(Alternatively, you can just set `SPRING_DATASOURCE_URL` to your full JDBC URL: `jdbc:postgresql://your-host:5432/medicine_finder_db?sslmode=require` along with `DB_USER` and `DB_PASSWORD`).*

#### Option B: Zero-Config In-Memory H2 (Instant Viva / Demo Mode)
If you want to deploy in 2 minutes without setting up any PostgreSQL database:
| Key | Value |
| :--- | :--- |
| `SPRING_PROFILES_ACTIVE` | `h2` |

---

### Step 5: Deploy & Verify

1. Click **Create Web Service**.
2. Render will trigger the Docker build. You can watch the build logs:
   - It will fetch dependencies, compile Java 25, run `mvn clean package`, and start Spring Boot.
3. Once the deployment finishes, Render gives you a public URL (e.g., `https://medkhoj-backend.onrender.com`).
4. Test your live backend in a browser or with curl:
   ```bash
   curl https://medkhoj-backend.onrender.com/api/search?query=paracetamol
   ```
   You should receive a valid JSON response containing pharmacy medicine listings!

---

## 🥈 Method 2: Deploy on Railway.app (Fastest 1-Click)

Railway provides 1-click PostgreSQL and instant Docker deployment.

1. Go to [Railway.app](https://railway.app) and sign in with GitHub.
2. Click **New Project** -> **Provision PostgreSQL**.
3. In the same project, click **New** -> **GitHub Repo** -> Select your repo.
4. Click on the added service card -> Go to **Settings**:
   - **Root Directory**: `/backend`
   - **Builder**: Dockerfile (automatically detected)
5. Go to **Variables** tab and add:
   - `SPRING_PROFILES_ACTIVE` = `postgres`
   - `DB_HOST` = `${{Postgres.PGHOST}}` *(Railway auto-fills this)*
   - `DB_PORT` = `${{Postgres.PGPORT}}`
   - `DB_NAME` = `${{Postgres.PGDATABASE}}`
   - `DB_USER` = `${{Postgres.PGUSER}}`
   - `DB_PASSWORD` = `${{Postgres.PGPASSWORD}}`
   - `DB_SSL_MODE` = `prefer`
6. Go to **Settings** -> **Networking** -> Click **Generate Domain**.
7. Railway will build and give you a public URL (e.g. `https://backend-production.up.railway.app`).

---

## 🥉 Method 3: Deploy on Any Linux VPS / Cloud VM (Docker)

If you have an AWS EC2 instance, DigitalOcean Droplet, or Ubuntu VPS:

1. **Install Docker on the server**:
   ```bash
   sudo apt update && sudo apt install -y docker.io docker-compose
   ```
2. **Clone your repository**:
   ```bash
   git clone https://github.com/your-username/My7thSem-Project.git
   cd My7thSem-Project/backend
   ```
3. **Build the Docker container**:
   ```bash
   sudo docker build -t medkhoj-backend .
   ```
4. **Run the container**:
   ```bash
   sudo docker run -d \
     --name medkhoj-backend \
     -p 8080:8080 \
     -e SPRING_PROFILES_ACTIVE=postgres \
     -e DB_HOST=your_db_host \
     -e DB_PORT=5432 \
     -e DB_NAME=medicine_finder_db \
     -e DB_USER=postgres \
     -e DB_PASSWORD="your_password" \
     --restart unless-stopped \
     medkhoj-backend
   ```
5. Your backend is now running at `http://your-server-ip:8080/api`.

---

## 🔗 Step 6: Connect Your Frontend to the Deployed Backend

Once your backend is live (e.g., `https://medkhoj-backend.onrender.com`), connect your frontend:

### If running Frontend locally:
Create or edit `frontend/.env`:
```env
VITE_API_BASE_URL=https://medkhoj-backend.onrender.com/api
```
Restart Vite (`npm run dev`). The frontend now talks to your cloud backend!

### If deploying Frontend on Vercel or Netlify:
1. Go to your frontend project settings on Vercel / Netlify.
2. In **Environment Variables**, add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://your-backend-url.onrender.com/api`
3. Redeploy the frontend.

---

## 🛡️ Pre-Flight Verification & Troubleshooting Checklist

| Potential Issue | Root Cause | Built-in Fix / Solution |
| :--- | :--- | :--- |
| **Port Conflict / Timeout** | Host gives random port (e.g. 10000 on Render) | `application.properties` uses `server.port=${PORT:8080}` to bind to host's assigned port automatically. |
| **Buildpack Java Error** | Cloud platforms default to Java 17/21 | `backend/Dockerfile` uses official `eclipse-temurin:25` so Java 25 compiles smoothly everywhere. |
| **Render Spin-down Delay** | Free tier on Render sleeps after 15 mins of inactivity | The first request after sleep takes 30-50 seconds to wake up. This is normal on free tiers. |
| **Cloud PostgreSQL SSL Error** | Cloud DBs require encrypted connections | `application-postgres.properties` has `&sslmode=${DB_SSL_MODE:prefer}`. Set `DB_SSL_MODE=require` if your host demands SSL. |
| **CORS Blocked in Browser** | Browser blocks cross-origin requests | `CorsConfig.java` enables `.allowedOriginPatterns("*")` and `.allowedMethods("*")` with credentials. |
| **Empty Database on First Run** | Tables missing on new cloud DB | `spring.jpa.hibernate.ddl-auto=update` creates tables automatically, and `DataInitializer.java` seeds data automatically on first launch! |

---

## 🧪 Testing Your Deployed Backend

Run these sample curl requests replacing `YOUR_BACKEND_URL` with your actual URL:

1. **Search Medicines (Public)**:
   ```bash
   curl "https://YOUR_BACKEND_URL/api/search?query=paracetamol"
   ```
2. **Pharmacy Details**:
   ```bash
   curl "https://YOUR_BACKEND_URL/api/pharmacies/1"
   ```
3. **Chemist Demo Login**:
   ```bash
   curl -X POST "https://YOUR_BACKEND_URL/api/auth/login" \
     -H "Content-Type: application/json" \
     -d '{"email":"cidco@apollopharmacy.example.com","password":"demo"}'
   ```

