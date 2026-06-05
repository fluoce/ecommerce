import sharp from "sharp";
import { SHARP_CONFIG } from "src/config/image-sharp.config";

type SharpVariant = keyof typeof SHARP_CONFIG;
type SharpProps = { buffer: Buffer };

const processImage = async (
    buffer: Buffer,
    { width, quality, effort }: { width: number; quality: number; effort: number }
): Promise<Buffer> => {
    return sharp(buffer)
        .resize({
            width,
            fit: 'inside',
            withoutEnlargement: true,
        })
        .webp({
            quality,
            effort,
        })
        .toBuffer();
};

const funcSharp = (variant: SharpVariant) => async ({
    buffer
}: SharpProps): Promise<Buffer> => {
    const cfg = SHARP_CONFIG[variant];
    return processImage(buffer, cfg);
};

export const funcSharpTiny = funcSharp("tiny");
export const funcSharpThumbnail = funcSharp("thumbnail");
export const funcSharpMedium = funcSharp("medium");
export const funcSharpLarge = funcSharp("large");