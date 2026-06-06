import { Module } from '@nestjs/common';
import { S3StorageService } from './aws/s3-storage.service';
import { R2StorageService } from './cloudflare/r2-storage.service';
import { STORAGE_TYPES } from 'src/config/storage.config';

@Module({
  imports: [],
  providers: [
    S3StorageService,
    R2StorageService,
    {
      provide: STORAGE_TYPES.S3,
      useExisting: S3StorageService,
    },
    {
      provide: STORAGE_TYPES.R2,
      useExisting: R2StorageService,
    },

  ],
  exports: [STORAGE_TYPES.S3, STORAGE_TYPES.R2],
})
export class StorageModule { }
