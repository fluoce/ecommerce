import { registerAs } from '@nestjs/config';

export const ASSET_SIZE_LIMITS = {
    IMAGE_MAX_SIZE: 5 * 1024 * 1024,
    VIDEO_MAX_SIZE: 100 * 1024 * 1024,
};

export const s3StorageConfig = registerAs(
    's3',
    () => ({
        region: process.env.S3_REGION!,
        bucketName: process.env.S3_BUCKET_NAME!,
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        url: process.env.S3_URL!
    }),
);


export const r2StorageConfig = registerAs(
    'r2',
    () => ({
        accountId: process.env.R2_ACCOUNT_ID!,
        bucketName: process.env.R2_BUCKET_NAME!,
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
        url: process.env.R2_URL!,
    }),
);