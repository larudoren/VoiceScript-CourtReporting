# Transcription Job Workflow System

A court reporting agency tool to manage transcription jobs – assign reporters/editors, track status (NEW → ASSIGNED → TRANSCRIBED → REVIEWED → COMPLETED), and calculate payments.

- **Backend**: Node.js + Express + TypeScript + Prisma + PostgreSQL  
- **Frontend**: Next.js 14 + TailwindCSS + Zustand  
- **Container**: Docker Compose

---

## 🚀 Run the App (Quick Start)

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) + [Docker Compose](https://docs.docker.com/compose/install/) installed.
- Git (to clone the repository).

### 1. Clone the repository
```bash
git clone https://github.com/larudoren/VoiceScript-CourtReporting
cd VoiceScript-CourtReporting
```

### 2. Setup env
- modify the `env.text` file in `/backend` folder become  `.env`
- modify the `env.local` file in `/frontend` folder become  `.env.local`

### 3. Start all services
```bash
docker-compose up --build
```
    This will:

    - Start PostgreSQL (workflow_db)

    - Start backend (Node.js) on port 4000

    - Start frontend (Next.js) on port 3000

### 4. Run database migrations & seed data

Open a new terminal and run:

```bash
# Apply migrations (creates tables)
docker exec -it workflow_backend npx prisma migrate dev --name init

# Seed reporters and editors
docker exec -it workflow_backend npx prisma db seed
```

### 5. Access the application

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api/jobs

Now can start create jobs, assign reporters/editors, and track the workflow.