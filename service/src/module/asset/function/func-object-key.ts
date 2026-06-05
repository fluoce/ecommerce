import path from 'node:path';
import { AssetKeyType } from '../types/asset.types';
import { AssetType } from '@prisma/client';

export function funcObjectKey({
    id,
    keyType,
    fileName,
    assetType
}: {
    id: string;
    fileName: string;
    keyType: AssetKeyType;
    assetType: AssetType
}): string {
    const extension = path
        .extname(fileName)
        .toLowerCase();
    return `assets/${assetType}/${id}/${keyType}${extension}`;
}


export function funcWebpImageObjectKey({
    id,
    keyType,
    assetType
}: {
    id: string;
    keyType: AssetKeyType;
    assetType: AssetType
}): string {
    return `assets/${assetType}/${id}/${keyType}.webp`;
}