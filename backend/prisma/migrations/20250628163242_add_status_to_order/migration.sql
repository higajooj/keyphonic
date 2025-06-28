-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('PENDING', 'COMPLETED', 'REFUSED');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "status" "StatusEnum" NOT NULL DEFAULT 'PENDING';
