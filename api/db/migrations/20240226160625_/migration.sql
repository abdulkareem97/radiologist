-- DropForeignKey
ALTER TABLE `catalogue` DROP FOREIGN KEY `Catalogue_categoryId_fkey`;

-- AddForeignKey
ALTER TABLE `Catalogue` ADD CONSTRAINT `Catalogue_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
