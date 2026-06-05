import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/postgresql/prisma.service";
import { CreateAssetDto } from "../types/create-asset.types";
import { Asset, AssetStatus } from "@prisma/client";
import { funcTryCatch } from "src/function/func-try-catch";

@Injectable()
export class AssetCoreService {
    private readonly logger = new Logger(AssetCoreService.name)

    constructor(private readonly prisma: PrismaService) { }

    async createAsset({ data }: { data: CreateAssetDto }): Promise<Asset | null> {
        return await funcTryCatch<Asset | null, null>({
            func: () => this.prisma.asset.create({
                data: {
                    ...data
                }
            }),
            action: "create_asset",
            logger: this.logger
        })
    }

    async getAssetById({ id }: { id: string }): Promise<Asset | null> {
        return await funcTryCatch<Asset | null, null>({
            func: () => this.prisma.asset.findUnique({
                where: {
                    id
                }
            }),
            action: "get_asset_byId",
            logger: this.logger
        })
    }

    async updateAsssetStatus({ id, status }: { id: string, status: AssetStatus }): Promise<Asset | null> {
        return await funcTryCatch<Asset | null, null>({
            func: () => this.prisma.asset.update({
                where: { id },
                data: { status }
            }),
            action: "update_asset_status",
            logger: this.logger
        });
    }

    async addAssetObjectKey({
        id,
        tinyKey,
        thumbnailKey,
        mediumKey,
        largeKey
    }: {
        id: string,
        tinyKey: string | undefined
        thumbnailKey: string | undefined,
        mediumKey: string | undefined,
        largeKey: string | undefined
    }): Promise<Asset | null> {
        return await funcTryCatch<Asset | null, null>({
            func: () => this.prisma.asset.update({
                where: {
                    id
                },
                data: {
                    tinyKey,
                    thumbnailKey,
                    mediumKey,
                    largeKey,
                }
            }),
            action: "add_asset_objectKey",
            logger: this.logger
        })
    }
}