# MHNB Starter Kit (PostgreSQL + Hono + Next.js + Bun)

This project is a starter template featuring a **Bun + Hono + Prisma (PostgreSQL)** backend (Server) and a **Next.js** frontend (Client).

## Features

- **Server**: Hono web framework with Bun runtime, PostgreSQL (Prisma ORM), Custom Auth (JWT), TypeScript.
- **Client**: Next.js (TypeScript).

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`)
- [Docker](https://www.docker.com/) (optional, for running PostgreSQL easily) or a local PostgreSQL instance.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/sirrryasir/PHNB-Starter-Kit.git
    cd PHNB-Starter-Kit
    ```

2.  **Install Server Dependencies:**

    ```bash
    cd server
    bun install
    ```

3.  **Install Client Dependencies:**
    ```bash
    cd client
    bun install
    ```

### Configuration

1.  **Server:**
    - Navigate to `server`.
    - Create a `.env` file (see `.env.example`).
    - Update `DATABASE_URL` if not using the default.
      ```env
      DATABASE_URL="postgresql://user:password@localhost:5432/PHNB-Starter-Kit?schema=public"
      ```

2.  **Database Setup (Docker):**
    - If you have Docker, you can start a Postgres instance easily:
      ```bash
      docker-compose up -d
      ```
    - Initialize Prisma:
      ```bash
      cd server
      bunx prisma migrate dev --name init
      ```

3.  **Client:**
    - Navigate to `client`.
    - Copy `env.example` to `.env.local`.
      ```bash
      cp env.example .env.local
      ```

### Running the App

1.  **Start Server (Development Mode):**

    ```bash
    cd server
    bun run dev
    ```

    Server runs on `http://127.0.0.1:5004` (Check `.env` for PORT).

2.  **Start Client:**
    ```bash
    cd client
    bun run dev
    ```
    Client runs on `http://localhost:3000`
