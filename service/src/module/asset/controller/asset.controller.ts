import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { assetRoutes } from '../constant/route';
import { AssetService } from '../service/asset.service';
import { AssetUploadCompleteDto, CreateSignUrlDto } from '../types/create-asset.types';

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
        @Body() data: AssetUploadCompleteDto
    ) {
        return await this.assetService.assetUploadComplete({ data })
    }

    @Delete(assetRoutes.assetId)
    async deleteAsset(
        @Param('assetId') assetId: string
    ) {
        return await this.assetService.deleteAsset({ assetId });
    }

}
