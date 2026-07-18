/*
  Warnings:

  - Changed the type of `scheduledDate` on the `Interview` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "scheduledDate",
ADD COLUMN     "scheduledDate" TIMESTAMP(3) NOT NULL;
