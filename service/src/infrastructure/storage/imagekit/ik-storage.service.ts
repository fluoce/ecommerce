import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage.interface';

@Injectable()
export class IkStorageService implements StorageService {
  upload(): Promise<string> {
    throw new Error('No Ik implemented');
  }
  delete(): Promise<void> {
    throw new Error('No Ik implemented');
  }
}
