import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { assetRoutes } from '../constant/route';
import { AssetService } from '../service/asset.service';
import { CreateSignUrlDto, GetMultipleAssetUrlDto } from '../dto/create-asset.types';

@Controller(assetRoutes.base)
export class AssetController {
    constructor(private readonly assetService: AssetService) {
    }

    @Post(assetRoutes.preSignedUploadUrl)
    async getPreSignedUploadUrl(
        @Body() data: CreateSignUrlDto
    ) {
        return await this.assetService.getPreSignedUploadUrl({ data })
    }

    @Post(assetRoutes.uploadComplete)
    async assetUploadComplete(
        @Param('assetId') assetId: string
    ) {
        return await this.assetService.assetUploadComplete({ assetId })
    }

    @Delete(assetRoutes.assetId)
    async deleteAsset(
        @Param('assetId') assetId: string
    ) {
        return await this.assetService.deleteAsset({ assetId });
    }

    @Get(assetRoutes.publicUrl)
    async assetPublicUrls(
        @Param('assetId') assetId: string
    ) {
        return await this.assetService.assetPublicUrls({ assetId });
    }

    @Get(assetRoutes.multipleAssetsPublicUrl)
    async assetsPublicUrls(
        @Body() data: GetMultipleAssetUrlDto
    ) {
        return await this.assetService.assetsPublicUrls({ assetIds: data.assetIds });
    }

}
