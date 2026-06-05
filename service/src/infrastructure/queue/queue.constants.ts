export const QUEUE_TYPES = {
  BULLMQ: Symbol('BULL_MQ'),
  RABBITMQ: Symbol('RABBIT_MQ')
};

export const QUEUES = {
  ASSET_PROCESSING: 'asset_processing',
} as const;

export const QUEUES_NAMES = {
  GENERATE_VARIANTS: "generate_image_variants",
}