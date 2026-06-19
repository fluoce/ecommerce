/*
  Warnings:

  - You are about to drop the column `usage` on the `Asset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "usage";

-- DropEnum
DROP TYPE "AssetUsage";
