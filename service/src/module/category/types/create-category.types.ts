import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @MaxLength(200)
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    parentId?: string

    @IsString()
    @IsOptional()
    thumbnailAssetId?: string

    @IsString()
    @IsOptional()
    bannerAssetId?: string
}