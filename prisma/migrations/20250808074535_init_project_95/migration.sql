/*
  Warnings:

  - Added the required column `shortDesc` to the `products` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `detailDesc` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `factory` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `shortDesc` VARCHAR(255) NOT NULL,
    MODIFY `image` VARCHAR(255) NOT NULL,
    MODIFY `detailDesc` VARCHAR(255) NOT NULL,
    MODIFY `factory` VARCHAR(255) NOT NULL;
