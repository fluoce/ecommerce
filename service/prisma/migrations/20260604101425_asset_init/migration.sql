-- CreateEnum
CREATE TYPE "AssetStatus" AS ENUM ('TEMPORARY', 'PROCESSING', 'READY', 'FAILED', 'DELETED');

-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateEnum
CREATE TYPE "AssetUsage" AS ENUM ('CATEGORY');

-- AlterEnum
ALTER TYPE "CategoryStatus" ADD VALUE 'DRAFT';

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "bannerAssetId" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "sortOrder" TEXT,
ADD COLUMN     "thumbnailAssetId" TEXT,
ALTER COLUMN "status" SET DEFAULT 'DRAFT';

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "type" "AssetType" NOT NULL,
    "usage" "AssetUsage" NOT NULL,
    "originalKey" TEXT NOT NULL,
    "thumbnailKey" TEXT,
    "mediumKey" TEXT,
    "largeKey" TEXT,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "status" "AssetStatus" NOT NULL DEFAULT 'TEMPORARY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Asset_type_idx" ON "Asset"("type");

-- CreateIndex
CREATE INDEX "Asset_status_idx" ON "Asset"("status");

-- CreateIndex
CREATE INDEX "Category_parentId_idx" ON "Category"("parentId");

-- CreateIndex
CREATE INDEX "Category_status_idx" ON "Category"("status");

-- CreateIndex
CREATE INDEX "Category_thumbnailAssetId_idx" ON "Category"("thumbnailAssetId");

-- CreateIndex
CREATE INDEX "Category_bannerAssetId_idx" ON "Category"("bannerAssetId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_thumbnailAssetId_fkey" FOREIGN KEY ("thumbnailAssetId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_bannerAssetId_fkey" FOREIGN KEY ("bannerAssetId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
