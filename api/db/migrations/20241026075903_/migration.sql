/*
  Warnings:

  - Added the required column `phoneno` to the `ReferDoctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `referdoctor` ADD COLUMN `phoneno` VARCHAR(191) NOT NULL;
