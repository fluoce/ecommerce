type SharpConfig = {
    tiny: {
        width: number,
        quality: number
        effort: number,
    },
    thumbnail: {
        width: number,
        quality: number,
        effort: number,
    },
    medium: {
        width: number,
        quality: number,
        effort: number,
    },
    large: {
        width: number,
        quality: number,
        effort: number,
    }
};

export const SHARP_CONFIG: Readonly<SharpConfig> = Object.freeze({
    tiny: Object.freeze({
        width: 80,
        quality: 65,
        effort: 2,
    }),
    thumbnail: Object.freeze({
        width: 380,
        quality: 70,
        effort: 4,
    }),
    medium: Object.freeze({
        width: 680,
        quality: 75,
        effort: 4,
    }),
    large: Object.freeze({
        width: 1080,
        quality: 80,
        effort: 6
    })
});