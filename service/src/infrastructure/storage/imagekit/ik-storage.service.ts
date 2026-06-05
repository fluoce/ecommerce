import { Injectable } from '@nestjs/common';
import { AssetStorageProvider } from '@prisma/client';

@Injectable()
export class IkStorageService {
    readonly provider: AssetStorageProvider = AssetStorageProvider.Ik
}
