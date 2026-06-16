import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/postgresql/prisma.service";
import { CreateCategoryDto } from "../types/create-category.types";
import { SlugService } from "src/lib/slug/slug.service";
import { IdService } from "src/lib/id/id.service";

@Injectable()
export class CategoryCoreService {

    private readonly logger = new Logger(CategoryCoreService.name)

    private readonly MAX_SLUG_CHECK_RETRY = 3

    constructor(
        private readonly prisma: PrismaService,
        private readonly slugService: SlugService,
        private readonly idService: IdService
    ) { }

    async categorySlugExist({ slug }: { slug: string }) {
        const exist = await this.prisma.category.findUnique({
            where: {
                slug
            }
        })
        if (exist) {
            return true
        }
        return false
    }

    async createCategory({
        data
    }: {
        data: CreateCategoryDto
    }) {
        return await this.prisma.category.create({
            data: {
                id: this.idService.generate(),
                name: data.name,
                description: data?.description ?? undefined,
                slug: this.slugService.baseSlug(data.name),
                parentId: data?.parentId ?? undefined,
                bannerAssetId: data?.bannerAssetId ?? undefined,
                thumbnailAssetId: data?.thumbnailAssetId ?? undefined
            }
        })
    }
}