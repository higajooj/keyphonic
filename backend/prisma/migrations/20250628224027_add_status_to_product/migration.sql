/*
  Warnings:

  - The values [PHONE] on the enum `CategoryEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "ProductStatusEnum" AS ENUM ('CRITIC', 'FULL', 'EMPTY');

-- AlterEnum
BEGIN;
CREATE TYPE "CategoryEnum_new" AS ENUM ('HEADPHONE', 'KEYBOARD', 'OTHER');
ALTER TABLE "products" ALTER COLUMN "category" TYPE "CategoryEnum_new" USING ("category"::text::"CategoryEnum_new");
ALTER TYPE "CategoryEnum" RENAME TO "CategoryEnum_old";
ALTER TYPE "CategoryEnum_new" RENAME TO "CategoryEnum";
DROP TYPE "CategoryEnum_old";
COMMIT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "status" "ProductStatusEnum" NOT NULL DEFAULT 'FULL';
