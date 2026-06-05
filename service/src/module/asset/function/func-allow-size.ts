import { ASSET_SIZE_LIMITS } from "src/config/storage.config";
import { funcFormatBytes } from "./func-format-bytes";

export function funcAllowSize({
    mimeType,
    size,
}: {
    mimeType: string;
    size: number;
}): {
    isAllow: boolean,
    message: string
} {
    if (mimeType.startsWith('image/')) {
        const isAllow = size <= ASSET_SIZE_LIMITS.IMAGE_MAX_SIZE;
        return {
            isAllow,
            message: isAllow
                ? '_'
                : `Image size ${funcFormatBytes(size)} exceeds the maximum allowed size of ${funcFormatBytes(ASSET_SIZE_LIMITS.IMAGE_MAX_SIZE)}.`

        };
    }

    if (mimeType.startsWith('video/')) {
        const isAllow = size <= ASSET_SIZE_LIMITS.VIDEO_MAX_SIZE;
        return {
            isAllow,
            message: isAllow
                ? '_'
                : `Video size ${funcFormatBytes(size)} exceeds the maximum allowed size of ${funcFormatBytes(ASSET_SIZE_LIMITS.VIDEO_MAX_SIZE)}.`
        };
    }

    return {
        isAllow: false,
        message: `Unsupported mimeType: ${mimeType}`
    };
}