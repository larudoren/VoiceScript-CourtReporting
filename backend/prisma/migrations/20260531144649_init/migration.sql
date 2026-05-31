-- CreateTable
CREATE TABLE "Reporter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Reporter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Editor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "flatFee" INTEGER NOT NULL DEFAULT 50000,

    CONSTRAINT "Editor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "caseName" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "location_type" TEXT NOT NULL,
    "city" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "reporter_id" INTEGER,
    "editor_id" INTEGER,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "Reporter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_editor_id_fkey" FOREIGN KEY ("editor_id") REFERENCES "Editor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
