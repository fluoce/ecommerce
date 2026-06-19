import { registerAs } from '@nestjs/config';

export const STORAGE_TYPES = {
    S3: Symbol('AWS_S3'),
    R2: Symbol('CLOUDFLARE_R2'),
};

export const ASSET_SIZE_LIMITS = {
    IMAGE_MAX_SIZE: 5 * 1024 * 1024,
    VIDEO_MAX_SIZE: 200 * 1024 * 1024,
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
        endPoint: process.env.R2_ENDPOINT!,
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
        url: process.env.R2_URL!,
    }),
);

export const storageAssetPublicUrls = () => ({
    S3: process.env.S3_URL!,
    R2: process.env.R2_URL!,
});

export const currentStorageProvider = STORAGE_TYPES.R2
