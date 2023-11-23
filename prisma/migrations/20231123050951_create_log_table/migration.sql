-- CreateEnum
CREATE TYPE "SeveriryLevel" AS ENUM ('Low', 'Medium', 'High');

-- CreateTable
CREATE TABLE "LogModel" (
    "id" SERIAL NOT NULL,
    "level" "SeveriryLevel" NOT NULL,
    "message" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogModel_pkey" PRIMARY KEY ("id")
);
