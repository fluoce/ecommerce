import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {}
}
