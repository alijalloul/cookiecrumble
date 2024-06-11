/*
  Warnings:

  - You are about to drop the column `productsIdQuatity` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productsIdQuatity",
ADD COLUMN     "productsIdQuantity" JSONB[];
