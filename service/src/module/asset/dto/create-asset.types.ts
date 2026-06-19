import { AssetStorageProvider, AssetType } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateSignUrlDto {
    @IsString()
    @MaxLength(200)
    @IsNotEmpty()
    fileName: string

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    mimeType: string

    @IsInt()
    @IsNotEmpty()
    size: number
}

export class CreateAssetDto {
    @IsString()
    @IsNotEmpty()
    id: string

    @IsEnum(AssetType)
    type: AssetType

    @IsString()
    @IsNotEmpty()
    originalKey: string

    @IsString()
    fileName: string

    @IsString()
    mimeType: string

    @IsEnum(AssetStorageProvider)
    provider: AssetStorageProvider
}

export class GetMultipleAssetUrlDto {
    @IsNotEmpty()
    assetIds: string[]
}