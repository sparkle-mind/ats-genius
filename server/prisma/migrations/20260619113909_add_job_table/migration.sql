-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('REMOTE', 'HYBRID', 'ONSITE');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('SAVED', 'APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN', 'JOINED');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "companyName" VARCHAR(255) NOT NULL,
    "jobTitle" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255),
    "location" VARCHAR(255) NOT NULL,
    "experience" VARCHAR(100),
    "jobType" "JobType" NOT NULL,
    "workMode" "WorkMode" NOT NULL,
    "platform" VARCHAR(100) NOT NULL,
    "jobUrl" TEXT,
    "companyWebsite" TEXT,
    "recruiterName" VARCHAR(255),
    "recruiterEmail" VARCHAR(255),
    "expectedSalary" DECIMAL(12,2),
    "offeredSalary" DECIMAL(12,2),
    "currency" VARCHAR(10) NOT NULL DEFAULT 'INR',
    "applicationDate" TIMESTAMP(3),
    "interviewDate" TIMESTAMP(3),
    "followUpDate" TIMESTAMP(3),
    "status" "JobStatus" NOT NULL DEFAULT 'SAVED',
    "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
    "jobDescription" TEXT,
    "note" TEXT,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "Job"("status");

-- CreateIndex
CREATE INDEX "Job_companyName_idx" ON "Job"("companyName");

-- CreateIndex
CREATE INDEX "Job_applicationDate_idx" ON "Job"("applicationDate");
