import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CategoryCoreService } from './category-core.service';
import { CreateCategoryDto } from '../types/create-category.types';
import { ResponseDataType } from 'src/types/response.type';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryCoreService: CategoryCoreService) { }

    async createCategory({ data }: { data: CreateCategoryDto }): Promise<ResponseDataType> {
        const slugExist = await this.categoryCoreService.categorySlugExist({ slug: data?.name })
        if (slugExist) {
            throw new BadRequestException(`${data.name} category already exist`)
        }
        const category = await this.categoryCoreService.createCategory({
            data
        })
        if (!category) {
            throw new ServiceUnavailableException("unable to create category")
        }
        return {
            message: "category created successfully",
            category
        }
    }
}
