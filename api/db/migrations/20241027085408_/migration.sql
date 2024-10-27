/*
  Warnings:

  - Added the required column `amount` to the `Investigation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `investigation` ADD COLUMN `amount` DOUBLE NOT NULL;
