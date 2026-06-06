/*
  Warnings:

  - The values [Ik] on the enum `AssetStorageProvider` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AssetStorageProvider_new" AS ENUM ('S3', 'R2');
ALTER TABLE "public"."Asset" ALTER COLUMN "provider" DROP DEFAULT;
ALTER TABLE "Asset" ALTER COLUMN "provider" TYPE "AssetStorageProvider_new" USING ("provider"::text::"AssetStorageProvider_new");
ALTER TYPE "AssetStorageProvider" RENAME TO "AssetStorageProvider_old";
ALTER TYPE "AssetStorageProvider_new" RENAME TO "AssetStorageProvider";
DROP TYPE "public"."AssetStorageProvider_old";
ALTER TABLE "Asset" ALTER COLUMN "provider" SET DEFAULT 'S3';
COMMIT;
