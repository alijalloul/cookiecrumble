/*
  Warnings:

  - A unique constraint covering the columns `[phonenumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_phonenumber_key" ON "User"("phonenumber");
