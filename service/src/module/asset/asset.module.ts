import { Module } from '@nestjs/common';
import { AssetService } from './service/asset.service';
import { AssetCoreService } from './service/asset-core.service';
import { AssetController } from './controller/asset.controller';
import { StorageModule } from 'src/infrastructure/storage/storage.module';
import { QueueModule } from 'src/infrastructure/queue/queue.module';
import { AssetProcessorService } from './processor/asset-processor.service';
import { AssetProcessor } from 'src/module/asset/processor/asset.processor';

@Module({
  imports: [StorageModule, QueueModule],
  controllers: [AssetController],
  providers: [AssetService, AssetCoreService, AssetProcessorService, AssetProcessor],
  exports: [AssetService, AssetProcessorService, AssetProcessor]
})
export class AssetModule { }
