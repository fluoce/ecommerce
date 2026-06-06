export const QUEUE_TYPES = {
    BULLMQ: Symbol('BULL_MQ'),
    RABBITMQ: Symbol('RABBIT_MQ')
};

export const currentQueueProvider = QUEUE_TYPES.BULLMQ

export const QUEUES = {
    ASSET_PROCESSING: 'asset_processing',
}

export const QUEUES_NAMES = {
    GENERATE_VARIANTS: "generate_image_variants",
}