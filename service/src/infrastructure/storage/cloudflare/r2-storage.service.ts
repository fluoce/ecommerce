import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage.interface';

@Injectable()
export class R2StorageService implements StorageService {
  upload(): Promise<string> {
    throw new Error('No R2 implemented');
  }
  delete(): Promise<void> {
    throw new Error('No R2 implemented');
  }
}
