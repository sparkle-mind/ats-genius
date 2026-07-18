-- CreateTable
CREATE TABLE "NextActions" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NextActions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NextActions" ADD CONSTRAINT "NextActions_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
