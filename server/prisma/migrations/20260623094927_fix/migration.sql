/*
  Warnings:

  - A unique constraint covering the columns `[applicationId,stage]` on the table `Interview` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Interview_applicationId_stage_key" ON "Interview"("applicationId", "stage");
