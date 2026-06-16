import { Module } from '@nestjs/common';
import { CategoryController } from './controller/category.controller';
import { CategoryService } from './service/category.service';
import { CategoryCoreService } from './service/category-core.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryCoreService]
})
export class CategoryModule { }
