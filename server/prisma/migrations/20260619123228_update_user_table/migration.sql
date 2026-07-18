/*
  Warnings:

  - Made the column `applicationDate` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "applicationDate" SET NOT NULL,
ALTER COLUMN "applicationDate" SET DATA TYPE TEXT,
ALTER COLUMN "interviewDate" SET DATA TYPE TEXT,
ALTER COLUMN "followUpDate" SET DATA TYPE TEXT;
