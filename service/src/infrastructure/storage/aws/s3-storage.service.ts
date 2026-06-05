import { Inject, Injectable, Logger } from '@nestjs/common';
import { StorageService } from '../storage.interface';
import { S3Client, PutObjectCommand, HeadObjectCommand, GetObjectCommand, type GetObjectCommandOutput, PutObjectCommandOutput } from "@aws-sdk/client-s3"
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3StorageConfig } from 'src/config/storage.config';
import type { ConfigType } from '@nestjs/config';
import { funcTryCatch } from 'src/function/func-try-catch';
import { AssetStorageProvider } from '@prisma/client';

@Injectable()
export class S3StorageService implements StorageService {
  readonly provider: AssetStorageProvider = AssetStorageProvider.S3;

  private readonly client: S3Client;

  private readonly logger = new Logger(S3StorageService.name);

  constructor(
    @Inject(s3StorageConfig.KEY)
    private readonly config: ConfigType<typeof s3StorageConfig>,
  ) {
    this.client = new S3Client({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  async preSignedUrl({ key, mimeType }: { key: string; mimeType: string; }): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.config.bucketName,
      Key: key,
      ContentType: mimeType
    });

    return await getSignedUrl(this.client, command, {
      expiresIn: 120
    });
  }

  async putObject({ key, buffer, contentType }: { key: string, buffer: Buffer, contentType: string }): Promise<string | null> {
    const command = new PutObjectCommand({
      Bucket: this.config.bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    const result = await funcTryCatch<PutObjectCommandOutput, null>({
      func: () => this.client.send(command),
      action: "s3_putObject",
      logger: this.logger
    })

    if (!result || !result?.ETag) {
      return null
    }
    return key
  }

  async getObject({ key }: { key: string }): Promise<Buffer | null> {
    const command = new GetObjectCommand({
      Bucket: this.config.bucketName,
      Key: key
    });

    const result = await funcTryCatch<GetObjectCommandOutput, null>({
      func: () => this.client.send(command),
      action: "s3_getObject",
      logger: this.logger
    })

    if (!result || !result?.Body) {
      return null
    }

    return await funcTryCatch<Buffer | null, null>({
      func: async () => {
        const byteArray = await result.Body?.transformToByteArray();
        if (!byteArray) return null;
        return Buffer.from(byteArray);
      },
      action: "s3_getObject_body_to_buffer",
      logger: this.logger
    })
  }

  async deleteObject({ key }: { key: string }): Promise<string | null> {
    throw new Error('No S3 implemented');
  }

  async exists({ key }: { key: string; }): Promise<boolean> {
    const command = new HeadObjectCommand({
      Bucket: this.config.bucketName,
      Key: key
    });

    const result = await funcTryCatch({
      func: () => this.client.send(
        command
      ),
      action: "s3_headObject",
      logger: this.logger,
    });

    return !!result;
  }
}