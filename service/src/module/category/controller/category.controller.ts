import { Body, Controller, Post } from '@nestjs/common';
import { categoryRoutes } from '../constant/route';
import { CategoryService } from '../service/category.service';
import { CreateCategoryDto } from '../types/create-category.types';

@Controller(categoryRoutes.base)
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    async createCategory(@Body() data: CreateCategoryDto) {
        return await this.categoryService.createCategory({ data })
    }
}
