/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_bannerAssetId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_thumbnailAssetId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropEnum
DROP TYPE "CategoryStatus";
