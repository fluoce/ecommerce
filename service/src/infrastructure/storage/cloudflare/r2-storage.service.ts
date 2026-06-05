import { Inject, Injectable } from '@nestjs/common';
import { AssetStorageProvider } from '@prisma/client';

@Injectable()
export class R2StorageService {
    readonly provider: AssetStorageProvider = AssetStorageProvider.R2
}