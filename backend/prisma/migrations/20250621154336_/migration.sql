/*
  Warnings:

  - You are about to drop the column `sub_total` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `price` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "sub_total",
ADD COLUMN     "price" INTEGER NOT NULL;
