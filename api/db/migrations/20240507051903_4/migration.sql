/*
  Warnings:

  - Added the required column `userId` to the `FunctionHall` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `functionhall` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `FunctionHall` ADD CONSTRAINT `FunctionHall_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
