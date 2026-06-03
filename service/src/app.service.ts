import { Injectable } from '@nestjs/common';
import type { ResponseDataType } from './types/response.type';

@Injectable()
export class AppService {
  checkHealth(): ResponseDataType {
    return {
      message: 'Tung Tung',
      timeStamp: new Date().toISOString(),
    };
  }
}
