import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { AssetModule } from './asset/asset.module';

@Module({
    imports: [AssetModule, CategoryModule,],
    providers: [],
    exports: [AssetModule, CategoryModule]
})
export class ModuleModule { }
