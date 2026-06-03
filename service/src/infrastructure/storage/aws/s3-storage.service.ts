import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage.interface';

@Injectable()
export class S3StorageService implements StorageService {
  upload(): Promise<string> {
    throw new Error('No S3 implemented');
  }
  delete(): Promise<void> {
    throw new Error('No S3 implemented');
  }
}
