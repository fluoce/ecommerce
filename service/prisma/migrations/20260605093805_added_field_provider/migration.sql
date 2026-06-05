-- CreateEnum
CREATE TYPE "AssetStorageProvider" AS ENUM ('S3', 'R2', 'Ik');

-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "provider" "AssetStorageProvider" NOT NULL DEFAULT 'S3';
