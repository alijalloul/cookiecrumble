/*
  Warnings:

  - You are about to drop the column `productsId` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productsId",
ADD COLUMN     "productsIdQuatity" TEXT[];

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "isAvailableForPurchase" DROP DEFAULT;
