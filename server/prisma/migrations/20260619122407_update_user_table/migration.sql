/*
  Warnings:

  - The values [SAVED,APPLIED,SCREENING,INTERVIEW,OFFER,REJECTED,WITHDRAWN,JOINED] on the enum `JobStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [FULL_TIME,PART_TIME,CONTRACT,FREELANCE,INTERNSHIP] on the enum `JobType` will be removed. If these variants are still used in the database, this will fail.
  - The values [REMOTE,HYBRID,ONSITE] on the enum `WorkMode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "JobStatus_new" AS ENUM ('saved', 'applied', 'screening', 'interview', 'offer', 'rejected', 'withdrawn', 'joined');
ALTER TABLE "public"."Job" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Job" ALTER COLUMN "status" TYPE "JobStatus_new" USING ("status"::text::"JobStatus_new");
ALTER TYPE "JobStatus" RENAME TO "JobStatus_old";
ALTER TYPE "JobStatus_new" RENAME TO "JobStatus";
DROP TYPE "public"."JobStatus_old";
ALTER TABLE "Job" ALTER COLUMN "status" SET DEFAULT 'saved';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "JobType_new" AS ENUM ('FullTime', 'PartTime', 'Contract', 'Freelance', 'Internship');
ALTER TABLE "Job" ALTER COLUMN "jobType" TYPE "JobType_new" USING ("jobType"::text::"JobType_new");
ALTER TYPE "JobType" RENAME TO "JobType_old";
ALTER TYPE "JobType_new" RENAME TO "JobType";
DROP TYPE "public"."JobType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WorkMode_new" AS ENUM ('Remote', 'Hybrid', 'Onsite');
ALTER TABLE "Job" ALTER COLUMN "workMode" TYPE "WorkMode_new" USING ("workMode"::text::"WorkMode_new");
ALTER TYPE "WorkMode" RENAME TO "WorkMode_old";
ALTER TYPE "WorkMode_new" RENAME TO "WorkMode";
DROP TYPE "public"."WorkMode_old";
COMMIT;

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "status" SET DEFAULT 'saved';
